require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    path = require('path'),
    bodyParser = require('body-parser'),
    logger = require('./helpers/logger'),
    projectPaths = require('./../config/server/paths.js'),
    database = require('./../config/server/database'),
    errorsHandler = require('./helpers/errorsHandler'),
    ApiError = require('./helpers/ApiError'),
    port = process.env.serverPort || 8081;

let app = express();

mongoose.Promise = require('q').Promise;
mongoose.connect(database, err => {
    if (err) {
        throw err;
    }
    logger.success('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(projectPaths.frontEnd, 'index.html'));
});

app.use(express.static(projectPaths.frontEnd));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session(require('../config/server/session')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./authorization')(passport, app);

app.use('/api', require('./api/api.routes'));

app.use((req, res, next) => {
    const err = new ApiError(`Not found resource ${req.url}`, 404);

    return next(err);
});

app.use(errorsHandler);

app.listen(port, err => {
    if (err) {
        throw err;
    } else {
        logger.success(`listening on port ${port}`);
    }
});