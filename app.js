var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//extra packages and middlewares
var mongo = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var hbs = require('hbs');

//models
var User = require('./model/User');
var Chat = require('./model/Chat');

//routers
var indexRouter = require('./routes/index');
var ddRouter = require('./routes/dd');

//global configs
var config = require('./config/globals');

//actual app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session and passport config
app.use(session({
  secret: 'discoodappdummytutorialprojectjsframeworkclass',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//home/splash/loading page
app.use('/', indexRouter);
//protects the routes after this with a login requirement
app.use((req, res, next)=>{
  if(!req.user){
    res.redirect('/login');
    return;
  }
    next();
});
//discord page
app.use('/discood', ddRouter);


//connecting to db
mongo.connect(config.db.conStr, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((message) => console.log('Connection successfull to db'))
      .catch((error) => console.log(error));



hbs.registerHelper('toShortDate', (longDate)=> {
  return new hbs.SafeString(longDate.toLocaleDateString('en-CA'));
});

hbs.registerHelper('receiverName', (chats, user)=> {
  var name = "";
  if(chats[0].receiver == user){
    name = chats[0].sender;
  }else{
    name = chats[0].receiver;
  }
  return new hbs.SafeString(name);
});

hbs.registerHelper('findDp', (sender)=> {
  var dp = '';
  User.findOne({username: sender},(err, found)=>{
    if(err){
      console.log(err);
    }
    else{
      dp = found.dp;     
    }
  });
  return new hbs.SafeString(dp);
});

hbs.registerHelper('isEqual', (user, name)=>{
  return (user != name)
})

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
