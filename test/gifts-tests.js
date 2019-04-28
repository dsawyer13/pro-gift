'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const { app, runServer, closeServer } = require('../server');
const { Gift } = require('../gifts/models.js');
const { TEST_DATABASE_URL } = require('../config')

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting Database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedGiftData() {
  console.info('seeding gift data');
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      username: faker.lorem.word(),
      giftName: faker.lorem.word(),
      giftLink: faker.internet.url(),
      giftPrice: faker.lorem.word()
    });
  }
  return Gift.insertMany(seedData);
}

describe('Gift Registry API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedGiftData();
  })

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {

    it('should return all existing gifts', function() {
      let res;
      return Gift
        .findOne()
        .then(gift => {
          return chai.request(app)
            .get(`/api/gifts/${gift.username}`)
        })
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);

        })

    });

    it('should return gifts with the correct fields', function() {
      let resGift;
      return Gift
        .findOne()
        .then(gift => {
          return chai.request(app)
            .get(`/api/gifts/${gift.username}`)
        })

        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);
          res.body.forEach(function(gift) {
            gift.should.be.a('object');
            gift.should.include.keys('id', 'giftName', 'giftLink', 'giftPrice');
          });

          resGift = res.body[0];
          return Gift.findById(resGift.id);
        })
        .then(gift => {
          resGift.giftName.should.equal(gift.giftName);
          resGift.giftLink.should.equal(gift.giftLink);
          resGift.giftPrice.should.equal(gift.giftPrice);
        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new gift item', function() {

      const newGift = {
        giftName: faker.lorem.word(),
        giftLink: faker.internet.url(),
        giftPrice: faker.lorem.word()
      };
      return Gift
        .findOne()
        .then(gift => {
          newGift.username = gift.username;

          return chai.request(app)
            .post(`/api/gifts/${gift.username}`)
            .send(newGift)
        })
        .then(function(res) {
          console.log("1", newGift)
          console.log("2", res.body)
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'giftName', 'giftLink', 'giftPrice');
          res.body.id.should.not.be.null;
          res.body.giftName.should.equal(newGift.giftName);
          res.body.giftLink.should.equal(newGift.giftLink);
          res.body.giftPrice.should.equal(newGift.giftPrice);
          return Gift.findById(res.body.id);
        })
        .then(function (gift) {
          gift.giftName.should.equal(newGift.giftName);
          gift.giftLink.should.equal(newGift.giftLink);
          gift.giftPrice.should.equal(newGift.giftPrice);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update fields you send over', function() {
      const updateData = {
        giftName: 'Super Smash Bros',
        giftLink: 'https://www.nintendo.com/',
        giftPrice: '$60'
      };

      return Gift
        .findOne()
        .then(gift => {
          updateData.id = gift.id;

          return chai.request(app)
            .put(`/api/gifts/${gift.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(204);
          return Gift.findById(updateData.id);
        })
        .then(gift => {
          gift.giftName.should.equal(updateData.giftName);
          gift.giftLink.should.equal(updateData.giftLink);
          gift.giftPrice.should.equal(updateData.giftPrice);
        });
    });
  });

  describe('DELETE endpoint', function() {

    it('should delete a gift by id', function() {

      let gift;

      return Gift
        .findOne()
        .then(_gift => {
          gift = _gift;
          return chai.request(app).delete(`/api/gifts/${gift.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Gift.findById(gift.id);
        })
        .then(_post => {
          should.not.exist(_post);
        });
    });
  });
});
