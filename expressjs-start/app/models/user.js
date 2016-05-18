var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//User model

var UserSchema = new Schema({
  email: String,
  username: String,
  password: String
})

module.exports = mongoose.model('User', UserSchema)
