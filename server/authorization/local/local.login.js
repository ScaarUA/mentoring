const LocalStrategy = require('passport-local').Strategy,
    jwt = require("jwt-simple"),
    config = require('../../../config/server/auth'),
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

            const payload = {
                id: user.id
            };

            user.local.token = jwt.encode(payload, config.token.secret);

            return done(null, user);
        });
    }));
};