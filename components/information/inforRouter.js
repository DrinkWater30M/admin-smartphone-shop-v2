var express = require('express');
var router = express.Router();
const accountController = require("../accounts/accountController");

/* GET home page. */
router.get('/', accountController.info);

module.exports = router;
