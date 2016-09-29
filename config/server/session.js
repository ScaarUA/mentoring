module.exports = {
    secret: 'project-flow-state',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*5 // 5 days
    }
};