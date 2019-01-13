'use strict';

const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const giftSchema = mongoose.Schema({
  giftName: {type: String, required: true},
  giftLink: String,
  giftPrice: String
});

giftSchema.methods.serialize = function() {
  return {
    id: this._id,
    giftName: this.giftName,
    giftLink: this.giftLink,
    giftPrice: this.giftPrice
  };
};

const Gift = mongoose.model('Gift', giftSchema);


module.exports = {Gift};
