var express = require('express');
var router = express.Router();
const accountController = require("./accountController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accounts/accountList', { title: 'Express' });
});

router.get('/Admin',accountController.list);


module.exports = router;
