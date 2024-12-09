var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // To save session


var connectionRoute = require('./routes/product-connection');
var guestViewRoute = require('./routes/guest-view-route');
var signInSignUpRoute = require('./routes/sign-in-sign-up-route');
var checkOutRoute = require('./routes/check-out-routes');
var recipientRoute = require('./routes/recipient-routes'); 
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session secret
app.use(
  session({
    secret: 'angpogipogiko',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: (1000 * 60) * 60 // 1 hour duration
    }
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Application routes
app.use('/product-connection', connectionRoute);
app.use('/guest-view-route', guestViewRoute);
app.use('/', signInSignUpRoute);
app.use('/check-out-routes', checkOutRoute);
app.use('/recipient-routes', recipientRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
