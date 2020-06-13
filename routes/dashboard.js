var express = require ('express');
var User = require ('../models/userModel');
var inviteDB = require('../models/invitationsDB')
var eventDB = require('../models/eventModel')
var router = express.Router ();
var invitations

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


router.get ('/', ensureAuthenticated,function (req, res, next) {
  res.render('dashboard', { name: req.user.name, userid: req.user.userid })
  // console.log(req)
});

router.get('/invitation/create', ensureAuthenticated, function (req, res, next) {
  // console.log(req.body)
  res.render('invitation', { title: 'Invitation' });
});

router.post('/invitation/accept', ensureAuthenticated, async function (req, res, next) {
  console.log(req.body)
  await inviteDB.findOneAndUpdate({_id: req.body.invite_id}, { status: 'a' })
  res.end()

});

router.post('/invitation/reject', ensureAuthenticated, async function (req, res, next) {
  console.log(req.body)
  await inviteDB.findOneAndUpdate({ _id: req.body.invite_id }, { status: 'r' })

  res.end()
});

// router.post('/invitation/view', ensureAuthenticated, async function (req, res, next) {
//   console.log(req.body)
//   await inviteDB.findOne({ _id: req.body.invite_id }, (err, inv) => {
//     res.send({})
//   })

  
// });

router.get('/invitations', ensureAuthenticated, async function (req, res, next) {
  invitations = []
  await inviteDB.find({
    participant: req.user.userid
  }, function(err, invitation_list){
    if(err) throw err

    invitation_list.forEach(invitation => {
      invitations.push(invitation)
    })

    res.render('invitations_to_me', { invitations: invitations });
    console.log(invitations)
  })
  
});

router.get('/events', ensureAuthenticated, function (req, res, next) {
  eventDB.find({host_id: req.user.userid}, function(err, list){
    res.render('my_events', {events: list});
  })
  
});

router.post('/event/delete', ensureAuthenticated, function (req, res, next) {
  inviteDB.find({name: req.body.event_name},function(err, list){
    if(err) throw err
    list.forEach(item => {
      inviteDB.findOneAndDelete({_id: item._id}, (err, doc)=>{
        if(err) throw err
      })
    })
  })
  eventDB.findOneAndDelete({ _id: req.body.event_id }, (err, doc) => {
    if(err) throw err

    res.end()
  })

});

router.post('/invitation/send', ensureAuthenticated, async function (req, res, next) {
  var data = {
    date: req.body.date,
    time: req.body.time,
    invitation: req.body.invitation,
    host: req.body.host,
    host_id: req.user.userid,
    description: req.body.description,
    name: req.body.name
  }

  var eventData = {
    date: req.body.date,
    time: req.body.time,
    host: req.body.host,
    host_id: req.user.userid,
    description: req.body.description,
    name: req.body.name
  }

  await eventDB.create(eventData, function (err, doc) {
    if (err) return console.log(err)
  })

  await req.body.participants.forEach(element => {
    data.participant = element
    data.status = 'p'

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
