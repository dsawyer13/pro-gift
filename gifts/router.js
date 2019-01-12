'use strict';

const express = require('express');

const { Gift } = require('./models');

const router = express.Router();


router.get('/', (req, res) => {
  res.send("Hello World")
  Gift.find()
    .then(users => res.json(users.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
  });


router.post("/", (req, res) => {
  const requiredFields = ["giftName"];
  const field = requiredFields[0];
  if(!(field in req.body)) {
    const message = `Missing Gift Name in request body`;
    console.error(message);
    return res.status(400).send(message);
    }
  const item = Gift.create(req.body.giftName, req.body.giftLink || '', req.body.giftPrice || '');
  res.status(201).json(item);
});

router.delete("/:id", (req, res) => {
  Gift.delete(req.params.id);
  console.log(`Deleted gift with id: \`${req.params.ID}\``);
  res.status(204).end();
});

router.put("/:id", (req, res) => {
  //find out if put, patch, or both is appropriate for updating parts of records
  const requiredFields = ["giftName", "giftLink", "giftPrice", "id"];
  for (let i = 0;i < requiredFields.length;i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body.`;
      console.error(message)
    }
  }
  if (req.params.id !== req.body) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Gift with id: \`${req.params.id}\``);
  Gift.update({
    id: req.params.id,
    giftName: req.params.giftName,
    giftLink: req.body.giftLink,
    giftPrice: req.body.giftPrice
  });
  res.status(204).end();
})

module.exports = {router};
