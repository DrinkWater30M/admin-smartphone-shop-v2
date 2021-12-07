const express = require('express');
const router = express.Router();
const passport = require("../../auth/passport");

router.get('/', function(req, res, next) {
    res.render('authen/signIn', {layout: null});
});
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/products',
        failureRedirect: '/products',
        failureFlash: true
    })

);
module.exports = router;
