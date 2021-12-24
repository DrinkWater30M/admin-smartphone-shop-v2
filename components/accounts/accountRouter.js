var express = require('express');
var router = express.Router();
const accountController = require("./accountController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accounts/accountList', { title: 'Express' });
});

router.get('/Admin',accountController.listAccountAdmin);

router.get('/Admin/add', function(req, res, next) {
  res.render('accounts/InsertAdmin', {  });
});

router.post('/Admin/add',accountController.createAccountAdmin)

module.exports = router;
