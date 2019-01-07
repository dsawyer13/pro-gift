'use strict';

const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const GiftSchema = mongoose.Schema({
//   giftName: {type: String, required: true},
//   giftLink: String,
//   giftPrice: String
// });
//
//
// GiftSchema.methods.serialize = function() {
//   return {
//     id: this._id || '',
//     giftName: this.giftName || '',
//     giftLink: this.giftLink || '',
//     giftPrice: this.giftPrice || '',
//   };
// };
//
// const Gift = mongoose.model('Gift', GiftSchema);


function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}


const Gift = {
  create: function(giftName, giftLink, giftPrice) {
    console.log("Creating new gift")
    const item = {
      id: uuid.v4(),
      giftName: giftName,
      giftLink: giftLink,
      giftPrice: giftPrice
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log("Retrieving gift list");
    return Object.keys(this.items).map(key => this.items[key]);
  }
}

function createGift() {
  const storage = Object.create(Gift);
  storage.items = {};
  return storage;
}

module.exports = {Gift: createGift()};
