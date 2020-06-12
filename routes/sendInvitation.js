var express = require('express');
var inviteDB = require('../models/invitationsDB')
var router = express.Router();

router.post('/', async function (req, res, next) {
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

        inviteDB.create(data, function(err, doc){
            if (err) return console.log(err)
        })
        
    });

    console.log(req.body)
    res.redirect('/')  
});

module.exports = router;
