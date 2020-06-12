var express = require ('express');
var router = express.Router ();

router.get ('/', function (req, res, next) {
    console.log(req.body)
    res.render ('invitation', {title: 'Invitation'});
});

module.exports = router;
