'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 },
});

//only create if it does not exists
mongoose.model('users', userSchema);
