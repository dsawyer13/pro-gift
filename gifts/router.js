'use strict';

const express = require('express');

const { Gift } = require('./models');

const router = express.Router();


router.get('/', (req, res) => {

  Gift.find()
    .then(gifts => {
      res.json(gifts.map(gift => gift.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});


router.post("/", (req, res) => {

  Gift
    .create({
      giftName: req.body.giftName,
      giftLink: req.body.giftLink,
      giftPrice: req.body.giftPrice
    })
    .then(gift => res.status(201).json(gift.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});


router.delete("/:id", (req, res) => {

  Gift
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog post with id \`${req.params.id}\``);
      res.status(204).end()
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error'});
    });
});


router.put("/:id", (req, res) => {

  const updated = {};
  const updateableFields = ['giftName', 'giftLink', 'giftPrice'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Gift
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedGift => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal Server Error'}));
});


module.exports = {router};
