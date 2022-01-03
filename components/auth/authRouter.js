const express = require('express');
const router = express.Router();
const passport = require("../../auth/passport");

//TODO: Tam de man hinh chinh, can sua thanh man hinh dang nhap
router.get('/', function (req, res, next) {
    const error = req.flash('message');
    res.render('authen/signIn.hbs', { layout: null, error });
});
// router.get('/', function(req, res, next) {
//     res.render('index');
// });
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })

);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
