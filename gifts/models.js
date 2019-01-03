'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const GiftSchema = mongoose.Schema({
  giftName: {type: String, required: true},
  giftLink: String,
  giftPrice: String
});


GiftSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    giftName: this.giftName || '',
    giftLink: this.giftLink || '',
    giftPrice: this.giftPrice || '',
  };
};

const Gift = mongoose.model('Gift', GiftSchema);

module.exports = {Gift};
