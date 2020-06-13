var express = require ('express');
var User = require ('../models/userModel');
var inviteDB = require('../models/invitationsDB')
var router = express.Router ();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get ('/', ensureAuthenticated,function (req, res, next) {
  res.render('dashboard', { name: req.user.name, userid: req.user.userid })
  // console.log(req)
});

router.get('/invitation/create', ensureAuthenticated, function (req, res, next) {
  console.log(req.body)
  res.render('invitation', { title: 'Invitation' });
});

router.get('/invitations', ensureAuthenticated, function (req, res, next) {
  res.render('invitations_to_me', {});
});

router.get('/events', ensureAuthenticated, function (req, res, next) {
  res.render('my_events', {});
});

router.post('/invitation/send', ensureAuthenticated, async function (req, res, next) {
  var data = {
    date: req.body.date,
    time: req.body.time,
    invitation: req.body.invitation,
    host: req.body.host,
    description: req.body.description,
    name: req.body.name
  }

  await req.body.participants.forEach(element => {
    data.participant = element

    inviteDB.create(data, function (err, doc) {
      if (err) return console.log(err)
    })

  });

  // console.log(req.body)
  res.redirect('/dashboard')
});

router.get('/profile', ensureAuthenticated, function (req, res, next) {
  res.render('profile', {user: req.user});
});



module.exports = router;
