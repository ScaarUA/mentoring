const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    logger = require('./helpers/logger'),
    projectPaths = require('./../config/server/paths.js'),
    database = require('./../config/server/database'),
    errorsHandler = require('./helpers/errorsHandler'),
    port = process.env.PORT || 8888;

let app = express();

mongoose.Promise = require('q').Promise;
mongoose.connect(database, err => {
    if(err) {
        throw err;
    }
    logger.success('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(projectPaths.frontEnd, 'index.html'));
});

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', require('./api/api.routes'));

// app.use(errorsHandler);

app.listen(port, err => {
    if(err) {
        throw err;
    } else {
        logger.success(`listening on port ${port}`);
    }
});