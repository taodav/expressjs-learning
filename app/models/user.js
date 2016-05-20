var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MailSchema = require('./mail.js')

//User model

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true, dropDups: true},
  username: { type: String, unique: true, required: true, dropDups: true},
  password: String,
  sentMail: [MailSchema],
})

UserSchema.index({name: 1, type: -1})

module.exports = mongoose.model('User', UserSchema)
