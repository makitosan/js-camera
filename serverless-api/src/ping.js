# only for heartbeat use
'use strict'
let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.send('pong');
});

module.exports = router;
