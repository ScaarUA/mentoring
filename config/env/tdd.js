/*eslint-disable no-console*/

const fs = require('fs'),
    exec = require('child_process').exec,
    webpack = require('webpack');

let webpackConf = require('./../webpack/webpack.config.test.js');

let changedFiles = [],
    dir = 'app',
    isModified = false,
    active;

fs.watch(dir, {recursive: true}, function (evt, file) {
    if(active) {
        return;
    }

    if((/\.ts$/.test(file) && evt === 'change') || (isModified && evt === 'rename')) {
        console.log(file, evt);
        file = `.\\${dir}\\${file}`;
        if(!~file.indexOf('spec')) {
            file = file.replace(/\.ts$/i, '.spec.ts');
        }
        if(!~changedFiles.indexOf(file)) {
            changedFiles.push(file);
        }
        active = true;
        webpackConf.entry = changedFiles;
        webpack(webpackConf, function (err/*, stats*/) {
            active = false;
            if(err) {
                throw err;
            }
            // console.log(stats.toString()) to see webpack log
            exec('mocha test/test.bundle.js --ansi --color', (err, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
            });
        });
        isModified = false;
    }
    if(!isModified) {
        isModified = !!~file.indexOf('___jb_tmp___') && evt === 'change';
    }
});