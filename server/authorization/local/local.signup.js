const LocalStrategy = require('passport-local').Strategy,
    User = require('../../api/users/user.model');

module.exports = passport => {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        User.findOne({'local.email': email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, false);
            } else {
                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.local.name = req.body.name;

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    }
    ));
};

