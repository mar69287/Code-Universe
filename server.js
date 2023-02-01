var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var session = require('express-session');
const passport = require('passport');

require('dotenv').config();
require('./config/database');
require('./config/passport');

var indexRouter = require('./routes/index');
var profilesRouter = require('./routes/profiles');
var skillsRouter = require('./routes/skills');
var projectsRouter = require('./routes/projects');
const volunteersRouter = require('./routes/volunteers')
const competitionsRouter = require('./routes/competitions')
const newsRouter = require('./routes/news')
const userRouter = require('./routes/user')
const followingsRouter = require('./routes/followings')
const followersRouter = require('./routes/followers')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/profiles', profilesRouter);
app.use('/projects', projectsRouter);
app.use("/", skillsRouter)
app.use('/', volunteersRouter);
app.use('/competitions', competitionsRouter);
app.use('/news', newsRouter);
app.use('/users', userRouter);
app.use('/followings', followingsRouter);
app.use('/followers', followersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
