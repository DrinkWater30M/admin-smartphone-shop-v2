const bcrypt = require('bcrypt');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const { models } = require('../models');



passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, username, password, done) {
        try{
            let accountAdmin = await models.quan_tri_vien.findOne({where: {TenDangNhap: username}, raw: true});
            if (!accountAdmin || !await validPassword(password, accountAdmin.MatKhau)) {
                return done(null, false, req.flash('message', 'Tài khoản hoặc mật khẩu không đúng!'));
            }        
            console.log("🚀 ~ file: passport.js ~ line 16 ~ function ~ accountAdmin", accountAdmin)
            return done(null, accountAdmin);
        }
        catch(err){
            return done(err);
        }
    }
));


passport.serializeUser(function(user, done) {
    done(null, 
        {
            MaAdmin: user.MaAdmin,
            TenDangNhap: user.TenDangNhap
        });
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

 
async function validPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
}

module.exports = passport;