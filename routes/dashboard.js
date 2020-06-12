var express = require ('express');
var bcrypt = require('bcrypt')
var users = require ('../models/userModel');
var router = express.Router ();

/* GET users listing. */
router.post ('/', function (req, res, next) {
  users.findOne({email: req.body.email}).exec(function (err, user) {
    if(err) return handleError(err, res) 
    // console.log(user)
    if(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err) return console.log(err)

        if (result) res.render('dashboard', { name: user.name, userid: user.userid })
        else res.send('Wrong password')
      })
    }
    else res.send("User doesn't exist")
  })

});

function handleError (e, r) {
    r.send(e)
    console.log (e);
}

module.exports = router;
