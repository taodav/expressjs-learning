var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Mail model

var MailSchema = new Schema({
  sender: String,
  receiver: String,
  subject: String,
  body: String,
  tone: Array,
  tone2: {}
})

MailSchema.index({name: 1, type: -1})

module.exports = mongoose.model('Mail', MailSchema)
