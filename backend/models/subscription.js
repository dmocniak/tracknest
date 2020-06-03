const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  title: { type: String, required: false },
  curPrice: { type: String, required: false },
  ogPrice: { type: String, required: false },
  imgURL: { type: String, required: false },
  productURL: { type: String, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
