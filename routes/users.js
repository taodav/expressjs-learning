var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../app/models/user')
// mongoose.connect('mongodb://localhost/empMail')
/* GET users listing. */

router.get('/new', function(req, res, next) {
    res.render('users/new');
  })

router.post('/', function(req, res, next){
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function(err){
    if (err){
      res.send(err);
    }
    req.session.id = user._id
    res.redirect('/users/' + user.id)
  })
})

router.get('/:id', function(req, res, next) {
  var user = User.findOne({_id: req.params.id }, function(err, docs){
    console.log(req.session)
    res.render('users/index', docs);
  })
})

router.delete('/:id', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
