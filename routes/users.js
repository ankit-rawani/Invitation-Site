var express = require('express');
var users = require('../models/userModel')
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
  var user = new users({email: req.body.email, password: req.body.password, name: req.body.name})
  console.log(user)
  user.save(function (err){
    if (err) return handleError(err)
  })

  res.redirect('/')
})

function handleError(e){
  console.log(e)
}

module.exports = router
