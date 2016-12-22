module.exports = function (passport) {
    require('./local.login')(passport);
    require('./local.signup')(passport);
    require('./local.auth')(passport);
};