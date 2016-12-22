const passportJWT = require("passport-jwt");
const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../../api/users/user.model');
const config = require('../../../config/server/auth');

const params = {
    secretOrKey: config.token.secret,
    jwtFromRequest: ExtractJwt.fromHeader('x-token')
};

module.exports = passport => {
    const strategy = new Strategy(params, function (payload, done) {
        User.findById(payload.id, function (err, user) {
            if (err) {
                return done(err);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(new Error("User not found"), null);
            }
        });
    });
    passport.use(strategy);
};
