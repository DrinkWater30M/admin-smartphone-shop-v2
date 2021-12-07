var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const { models } = require('../models');
const account = require("../models/cua_hang");


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
},
    function (username, password, done) {
        console.log("🚀 ~ file: passport.js ~ line 12 ~ username, password", username, password)
        account.findOne({ where: { TenDangNhap: username } }, function (err, user) {
            console.log("🚀 ~ file: passport.js ~ line 14 ~ err, user", err, user)

            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!validPassword(user, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    },

    // async function (username, password, done) {
    //     let user = await models.cua_hang.findOne({ where: { TenDangNhap: username }, raw: true });
    //     console.log(user);


    //     //  function (err, user) {
    //     // console.log("🚀 ~ file: passport.js ~ line 14 ~ err, user", err, user)
    //     if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //     }
    //     if (!validPassword(user, password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    // }
));

function validPassword(user, password) {
    return user.MatKhau === password;
}

module.exports = passport;