const User = require('../../api/users/user.model');

module.exports = function (passport) {
    require('./local.login')(passport);
    require('./local.signup')(passport);
};