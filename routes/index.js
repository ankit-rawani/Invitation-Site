var express = require('express');
var router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', forwardAuthenticated,function(req, res, next) {
  res.render('index', { title: 'Host your Event' });
});

module.exports = router;
