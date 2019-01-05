'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, runServer, closeServer } = require('../server.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('index page', function() {

  it('should return status 200', function() {
    return chai
      .request(app)
      .get("/gifts")
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
