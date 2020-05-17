'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveysSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // recipients: [String], // <-- tell mongoose this will be an array of strs
  recipients: [RecipientSchema], // <- but insead we use a list of subdocument collection
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // <- Relationship field to User model
  dateSent: Date,
  lastResponded: Date,
});
// Underscore on '_user' is only convention, implies relational field (foreign key)

//only create if it does not exists
mongoose.model('surveys', surveysSchema);
