class Authen{

    isLoggedIn (req, res, next){    
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
    }

    isNotloggedIn (req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/');
        }
        next();
    }

}

module.exports = new Authen();