var express = require('express');
var router = express.Router();
const inforController = require("./inforController");

/* GET home page. */
router.get('/', inforController.info);

module.exports = router;
