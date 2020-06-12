var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('invitations_to_me', {});
});

module.exports = router;
