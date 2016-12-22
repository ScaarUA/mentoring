const User = require('../api/users/user.model');
const passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());

    require('./local')(passport);
    require('./google')(passport);

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth/local/signup', passport.authenticate('local-signup'), (req, res) => {
        res.send(req.user.local);
    });

    app.post('/auth/local/login', passport.authenticate('local-login'), (req, res) => {
        res.send(req.user.local);
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: `http://localhost:${process.env.webpackServerPort}/users/auth?from-google=true`,
            failureRedirect: '/auth'
        }));

    function authenticate() {
        return passport.authenticate("jwt", { session: false });
    }

    return { authenticate }
};