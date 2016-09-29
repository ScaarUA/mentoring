const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    authConfig = require('../../../config/server/auth'),
    User = require('../../api/users/user.model');

module.exports = passport => {

    passport.use(new GoogleStrategy(authConfig.googleAuth,
        (token, refreshToken, profile, done) => {
            User.findOne({'google.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.google = {
                        id: profile.id,
                        token,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    };

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));

};