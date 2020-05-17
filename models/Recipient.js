'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

//only create if it does not exists
// mongoose.model('recipients', recipientSchema);
module.exports = recipientSchema;
