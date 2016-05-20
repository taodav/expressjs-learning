var express = require('express');
var router = express.Router()
var mongoose = require('mongoose')
var Mail = require('../app/models/mail')
var api_key = process.env.API_KEY
var domain = 'sandbox002d112a19f543c09172f4d6e517b08e.mailgun.org'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

var watson = require('watson-developer-cloud');

/* GET home page. */

router.get('/', function(req, res, next){
  res.render('index')
})

router.get('/email/new', function(req, res, next) {
  res.render('users/index', { title: 'Express', name: 'David'});
});

router.post('/email', function(req, res, next){
  var mail = new Mail()
  mail.sender = req.body.from
  mail.receiver = req.body.to
  mail.subject = req.body.subject
  mail.body = req.body.text

  // API call to bluemix
  var tone_analyzer = watson.tone_analyzer({
    username: process.env.BLUEMIX_USERNAME,
    password: process.env.BLUEMIX_PASSWORD,
    version: 'v3-beta',
    version_date: '2016-02-11',
    sentences: false
  });

  tone_analyzer.tone({ text: req.body.text },
    function(err, tone) {
      if (err)
        console.log(err);
      else
  // set tone equal to resulting info
      mail.tone = [tone];
      console.log(mail.tone[0])
      mail.save(function(err){
        if (err){
          res.send(err)
        }
        res.redirect('/mail/' + mail.id)
      })
  });

})

router.get('/mail/:id', function(req, res, next){
  Mail.findOne({_id: req.params.id}, function(err, docs){
    console.log(docs.tone[0].document_tone.tone_categories[0].tones)
      res.render('emails/new_email', {info: docs, sentences_tone: docs.tone[0].sentences_tone, document_tone: docs.tone[0].document_tone})
  })

})

router.post('/mail', function(req, res, next){
  var data = req.body
  mailgun.messages().send(data, function(error, body){
    console.log(body)
    console.log(error)
    if (!error) res.render('sent')
  })
})


module.exports = router;
