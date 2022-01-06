var express = require('express');
var router = express.Router();
const orderController = require('./orderController');

/* GET home page. */
router.get('/', orderController.getOrderList);

router.post('/', orderController.handlingOrder);

module.exports = router;
