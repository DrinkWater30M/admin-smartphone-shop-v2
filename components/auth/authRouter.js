const express = require('express');
const router = express.Router();
const passport = require("../../auth/passport");

//TODO: Tam de man hinh chinh, can sua thanh man hinh dang nhap
router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/products',
        failureRedirect: '/products',
        failureFlash: true
    })

);
module.exports = router;
