const LocalStrategy = require('passport-local').Strategy,
    User = require('../../api/users/user.model');

module.exports = passport => {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user || !user.isPasswordValid(password)) {
                return done(null, false);
            }
            
            return done(null, user);
        });
    }
    ));
};