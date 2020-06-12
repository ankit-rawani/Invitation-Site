var express = require('express');
var bcrypt = require('bcrypt')
var users = require('../models/userModel')
var router = express.Router();
var saltRounds = 10

router.post('/', async function(req, res, next) {
  await users.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) return handleError(err, res)
    // console.log(user)
    if (user) {
      res.send('E-mail ID already exists')
      console.log(user)
    }
    else {
      users.findOne({ userid: req.body.userid }).exec(function (err, u) {
        if (err) return handleError(err, res)
        // console.log(user)
        if (u) {
          res.send('User ID already exist, choose another')
        }
        else {
          bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
            if(err) return console.log(err)

            users.create({ email: req.body.email, password: hash, name: req.body.name, userid: req.body.userid }, function(err, doc){
              if (err) return handleError(err)
            })
            res.redirect('/')
          })
          
        }
      })

      
    }
  })
})

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


function handleError(e){
  console.log(e)
}

module.exports = router
