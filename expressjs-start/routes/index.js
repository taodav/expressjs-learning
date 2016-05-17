var express = require('express');
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'David'});
});

router.post('/email', function(req, res, next){
  var data = req.body
  var api_key = process.env.API_KEY
  var domain = 'sandbox002d112a19f543c09172f4d6e517b08e.mailgun.org'
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

  mailgun.messages().send(data, function(error, body){
    console.log(body)
    console.log(error)
  })

  res.render('new_email', { email: req.body.email, subject: req.body.subject, text: req.body.text })
})

router.get('/new', function(req, res, next){

})


module.exports = router;
