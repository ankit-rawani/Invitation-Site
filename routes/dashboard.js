var express = require ('express');
var users = require ('../models/userModel');
var router = express.Router ();

/* GET users listing. */
router.post ('/', function (req, res, next) {
  users.findOne({email: req.body.email}).exec(function (err, user) {
    if(err) return handleError(err, res) 
    // console.log(user)
    if(user) {
        if(user.password == req.body.password) res.render('dashboard', {title: user.email, name: user.name, email: user.email})
        else res.send('Wrong password')
    }
    else res.send("User doesn't exist")
  })

});

function handleError (e, r) {
    r.send(e)
    console.log (e);
}

module.exports = router;
