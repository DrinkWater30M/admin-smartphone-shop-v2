const express = require('express');
const router = express.Router();
const passport = require("../../auth/passport");

//TODO: Tam de man hinh chinh, can sua thanh man hinh dang nhap
router.get('/login', function(req, res, next) {
    res.render('authen/signIn.hbs', { layout: null});
});
router.get('/', function(req, res, next) {
    res.render('index');
});
router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        // failureFlash: true
    })

);
module.exports = router;
