/*eslint-disable no-console*/

const exec = require('child_process').exec,
    fs = require('fs'),
    argv = require('yargs').argv;

let extension;

switch (argv.type) {
case 'eslint':
    extension = 'js';
    break;
case 'tslint':
    extension = 'ts';
    break;
}

let ignoreList = argv.type === 'eslint' ? fs.readFileSync('.eslintignore', 'utf-8').split('\n') : [];

exec('git diff --cached --name-status --diff-filter=ACM', (err, stdout, stderr) => {
    let modified = stdout.split('\n').map((file) => {
        return file.slice(1).trim();
    });

    modified = modified.filter((file) => {
        if(~file.indexOf('.d.ts')) {
            return;
        }

        let filePattern = new RegExp(`\.${extension}$`);

        return filePattern.test(file) && ignoreList.indexOf(file) === -1;
    }).join(' ');

    console.log('modified files:', modified);
    if (modified.indexOf(`.${extension}`) === -1) {
        return;
    }

    exec(`${argv.type} ${modified}`, (err, stdout, stderr) => {
        console.log(stdout);
        let nmbOfErrors = /\d+?(?= error)/m.exec(stdout);

        if (nmbOfErrors && parseInt(nmbOfErrors[0]) > 0) {
            process.exit(1);
        }
        console.log(stderr);
    });
    console.log(stderr);
});