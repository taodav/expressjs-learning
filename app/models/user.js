var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//User model

var UserSchema = new Schema({
  email: String,
  username: String,
  password: String,
  sentMail: Array,
})

UserSchema.index({name: 1, type: -1})

module.exports = mongoose.model('User', UserSchema)
