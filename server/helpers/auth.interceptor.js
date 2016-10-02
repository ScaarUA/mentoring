function authInterceptor(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.status(401).send({message: 'You have no permissions to access this page'});
    }
}

module.exports = authInterceptor;