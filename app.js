var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var dotenv = require('dotenv').config();
var session = require('client-sessions');
var mongoose = require('mongoose')
var User = require('./app/models/user')
mongoose.connect(process.env.MONGODB_URI)
var methodOverride = require('method-override')

var routes = require('./routes/index');
var users = require('./routes/users');

// mongoose.connect('mongodb://localhost/empMail')

var app = express();
require('express-dynamic-helpers-patch')(app)
//https://github.com/sebabelmar/dbc_nem_api/blob/master/app.js
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'SeE3CR3ETT',
  duration: 30*60*1000,
  activeDuration: 5*60*1000
}))

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.dynamicHelpers({
  session: function(req, res) {
    return req.session
  },
  currentUser: function(req, res){return User.findOne({_id: req.params.id }, function(err, docs){return docs
  })}
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
