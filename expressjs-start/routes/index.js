var express = require('express');
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'David'});
});

router.post('/email', function(req, res, next){
  var data = req.body
  var watson = require('watson-developer-cloud');

  var tone_analyzer = watson.tone_analyzer({
    username: process.env.BLUEMIX_USERNAME,
    password: process.env.BLUEMIX_PASSWORD,
    version: 'v3-beta',
    version_date: '2016-02-11'
  });

  tone_analyzer.tone({ text: "I'm a bit scared... What should I do with my life?" },
    function(err, tone) {
      if (err)
        console.log(err);
      else
        console.log(JSON.stringify(tone, null, 2));
  });
  // http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/tone-analyzer/api/v3/?node#apiexplorer
  //https://www.tensorflow.org/versions/r0.8/tutorials/mnist/beginners/index.html
  // var api_key = process.env.API_KEY
  // var domain = 'sandbox002d112a19f543c09172f4d6e517b08e.mailgun.org'
  // var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain})

  // mailgun.messages().send(data, function(error, body){
  //   console.log(body)
  //   console.log(error)
  // })

  res.render('new_email', { email: req.body.email, subject: req.body.subject, text: req.body.text })
})

router.get('/new', function(req, res, next){

})


module.exports = router;
