var express = require('express');
var bcrypt = require('bcrypt')
var User = require('../models/userModel')
var router = express.Router();
var passport = require('passport')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

var saltRounds = 10

// Login Page
router.get('/login',forwardAuthenticated, (req, res, next) => res.render('login'))

// Register Page
router.get('/register', forwardAuthenticated, (req, res, next) => res.render('register'));


// Register
router.post('/register', (req, res) => {
  const { name, email, userid, password, cpassword } = req.body;
  // console.log(req.body)
  let errors = [];

  if (!name || !email || !password || !cpassword || !userid) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != cpassword) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      userid,
      password,
      cpassword
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          userid,
          password,
          cpassword
        });
      } else {
        User.findOne({ userid: userid }).then(user => {
          if (user) {
            errors.push({ msg: 'UserID already exists' });
            res.render('register', {
              errors,
              name,
              email,
              userid,
              password,
              cpassword
            });
        }
        else{
        const newUser = new User({
          email,
          password,
          name,
          userid
        });

        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        
        });
      }
    });
  }
});
}
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

router.get('/getUsers', async function (req, res, next) {
  var data = []

  await users.find({}, async function(err, user_list){
    user_list.forEach(user => {
      data.push({
        name: user.name,
        userid: user.userid
      });
    })
  })

  res.send(data)
  console.log(data)
  
})




module.exports = router
