var express = require('express');
var router = express.Router();
const dashboardController = require("./dashboardController");

/* GET home page. */
router.get('/', dashboardController.getTopProducts);

module.exports = router;
