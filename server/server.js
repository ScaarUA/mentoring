const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    logger = require('./helpers/logger'),
    projectPaths = require('./config/project.paths');

let app = express(),
    port = process.env.PORT || 8888;

mongoose.connect(require('./config/database'), err => {
    if(err) {
        throw err;
    }
    logger.success('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(projectPaths.frontEnd, 'index.html'));
});

app.use('/', require('./routes/main.router'));

app.listen(port, err => {
    if(err) {
        throw err;
    } else {
        logger.success(`listening on port ${port}`);
    }
});