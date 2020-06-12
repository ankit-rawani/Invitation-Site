var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dashRouter = require('./routes/dashboard');
var usersRouter = require ('./routes/users');
var loginRouter = require('./routes/login');
var regRouter = require ('./routes/register');
var inviteRouter = require('./routes/invitation')
var sendRouter = require('./routes/sendInvitation')
var invitationToMeRouter = require('./routes/invitationsToMe')
var profileRouter = require('./routes/profile')
var eventRouter = require('./routes/myEvents')

var app = express();
require('dotenv').config()

//Set up mongodb connection
var mongoose = require ('mongoose');
var mongoDB = process.env.DB_LINK;
mongoose.connect (mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on ('error', console.error.bind (console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', dashRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/register', regRouter)
app.use ('/createInvitation', inviteRouter);
app.use('/sendInvitation', sendRouter);
app.use('/invitations', invitationToMeRouter);
app.use('/events', eventRouter);
app.use('/profile', profileRouter);


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
