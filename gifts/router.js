'use strict';

const express = require('express');

const { Gift } = require('./models');

const router = express.Router();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/:username', (req, res) => {
  


  const currentUser = (req.params.username).toString();
  console.log(currentUser);
  Gift.find({"username": currentUser})
    .then(gifts => {
      res.json(gifts.map(gift => gift.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'});
    });

})


router.post("/:username", (req, res) => {
  console.log(req.params.username)
  const requiredFields = ['giftName', 'giftLink', 'giftPrice'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Gift
    .create({
      username: req.params.username,
      giftName: req.body.giftName,
      giftLink: req.body.giftLink,
      giftPrice: req.body.giftPrice
    })
    .then(gift => res.status(201).json(gift.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Internal Server Error'});
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
   if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
     res.status(400).json({
       error: 'Request path id and request body id values must match'
     });
   }

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
