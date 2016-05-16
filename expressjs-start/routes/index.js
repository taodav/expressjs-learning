var express = require('express');
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'David'});
});

router.post('/poo', function(req, res, next){
  console.log(req.body.name)
  res.redirect('/')
})

module.exports = router;
