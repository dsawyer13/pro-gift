'use strict';

const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const giftSchema = mongoose.Schema({
  username: String,
  giftName: {type: String, required: true},
  giftLink: String,
  giftPrice: String,
  purchased: {type: Boolean, default: false}
});

giftSchema.methods.serialize = function() {
  return {
    username: this.username,
    id: this._id,
    giftName: this.giftName,
    giftLink: this.giftLink,
    giftPrice: this.giftPrice
  };
};

const Gift = mongoose.model('Gift', giftSchema);


module.exports = {Gift};
