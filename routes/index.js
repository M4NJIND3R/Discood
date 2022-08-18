var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../model/User');

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, "./routes/uploads")
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now()+".pdf")
//   }
// });

// const maxSize = 1 * 1024 * 1024;

// var upload = multer({ 
//   storage: storage,
//   limits: { fileSize: maxSize },
//   fileFilter: function (req, file, cb){
//       var filetypes = /jpeg|png|jpg|gif/;
//       var mimetype = filetypes.test(file.mimetype);
//       var extname = filetypes.test(path.extname(
//                   file.originalname).toLowerCase()); 
//       if (mimetype && extname) {
//           return cb(null, true);
//       }  
//       cb("Error: File upload only supports the "
//               + "following filetypes - " + filetypes);
//     }  
// }); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

//GET: /login
router.get('/login', (req, res, next)=>{
  // Obtain messages if any
  let messages = req.session.messages || [];
  // Clear messages
  req.session.messages = [];
  // Pass messages to view
  res.render('login', { title: 'Login', messages: messages });
});

//GET: /register 
router.get('/register', (req, res, next)=> {
  res.render('register', {title: 'Create new account'});
});

//GET: /logout
router.get('/logout', (req, res, next) => {
  req.session.destroy(function(err) {
    res.redirect('/login');
  });
});

//POST: /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/discood',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}
));

//POST: /register
router.post('/register', (req, res, next) => {
  User.findOne({
    username: req.body.username,
  },(err, user)=>{
    if(err) console.log(err)
    else if(req.body.password != req.body.confirm){
      console.log("password dont match");
      return res.redirect('/register');
    }
    else if(user){
      console.log("user alraady exist");
      return res.redirect('/register');
    }
    else{
      var DPplaceholderBuffer = fs.readFileSync(path.join(__dirname+'/imagesUpload/ph.jpeg'));
      //Create a new user based on the information from the page
      User.register(new User({
        username: req.body.username,
        dp: DPplaceholderBuffer.toString('base64'),
        created: Date.now()
      }),
      req.body.password,
      (err, newUser) => {
        if (err) {
          console.log(err);
          // take user back and reload register page
          return res.redirect('/register');
        }
        else {
          // log user in
          req.login(newUser, (err) => {
            res.redirect('/discood');
          });
        }
      });
    }
  })
});


module.exports = router;
