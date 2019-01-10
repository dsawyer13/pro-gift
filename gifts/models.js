'use strict';

const uuid = require('uuid');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

<<<<<<< HEAD
const giftSchema = mongoose.Schema({
=======
const GiftSchema = mongoose.Schema({
>>>>>>> d222f24eed7058a9de92e35174431b85cf8f5971
  giftName: {type: String, required: true},
  giftLink: String,
  giftPrice: String
});


<<<<<<< HEAD
giftSchema.methods.serialize = function() {
  return {
    id: this._id,
    giftName: this.giftName,
    giftLink: this.giftLink,
    giftPrice: this.giftPrice
  };
};

const Gift = mongoose.model('Gift', giftSchema);
=======
GiftSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    giftName: this.giftName || '',
    giftLink: this.giftLink || '',
    giftPrice: this.giftPrice || '',
  };
};

const Gift = mongoose.model('Gift', GiftSchema);

>>>>>>> d222f24eed7058a9de92e35174431b85cf8f5971


module.exports = {Gift};
