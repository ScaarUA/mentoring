const fs = require('fs'),
    exec = require('child_process').exec,
    webpack = require('webpack');

let webpackConf = require('./webpack.config.test');

let changedFiles = [],
    dir = 'app';

fs.watch(dir, {recursive: true}, function (evt, file) {
    if(/\.js$/.test(file) && evt === 'change') {
        file = `.\\${dir}\\${file}`;
        if(!~file.indexOf('spec')) {
            file = file.replace(/\.js$/i, '.spec.js');
        }
        if(!~changedFiles.indexOf(file)) {
            changedFiles.push(file);
        }
        webpackConf.entry = changedFiles;
        webpack(webpackConf, function (err, stats) {
            if(err) {
                throw err;
            }
            // console.log(stats.toString()) to see webpack log
            exec(`mocha test/test.bundle.js --ansi --color`, (err, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
            });
        });
    }
});