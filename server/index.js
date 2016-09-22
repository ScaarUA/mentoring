const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    logger = require('./helpers/logger'),
    projectPaths = require('./../config/server/paths.js'),
    database = require('./../config/server/database'),
    port = process.env.PORT || 8888;

let app = express();

mongoose.connect(database, err => {
    if(err) {
        throw err;
    }
    logger.success('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(projectPaths.frontEnd, 'index.html'));
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', require('./api'));

app.listen(port, err => {
    if(err) {
        throw err;
    } else {
        logger.success(`listening on port ${port}`);
    }
});