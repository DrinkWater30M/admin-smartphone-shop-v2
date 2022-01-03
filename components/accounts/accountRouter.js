var express = require('express');
var router = express.Router();
const accountController = require("./accountController");

/* GET home page. */
router.get('/', accountController.listAccountCustomer);

router.get('/Admin',accountController.listAccountAdmin);

router.get('/Admin/add', function(req, res, next) {
  res.render('accounts/InsertAdmin', {  });
});

router.get('/profile',accountController.info)

router.post('/profile', accountController.editInfo);

router.post('/Admin/add',accountController.createAccountAdmin);

router.post('/', accountController.handlingAccount);

module.exports = router;
