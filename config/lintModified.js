/*eslint-disable no-console*/

const exec = require('child_process').exec,
    fs = require('fs');

let ignoreList = fs.readFileSync('.eslintignore', 'utf-8').split('\n');

exec('git ls-files --modified', (err, stdout, stderr) => {
    let modified = stdout.split('\n');

    modified = modified.filter((file) => {
        return /\.js$/.test(file) && ignoreList.indexOf(file) === -1;
    }).join(' ');

    console.log('modified files:', modified);

    exec(`eslint ${modified}`, (err, stdout, stderr) => {
        console.log(stdout);
        let nmbOfErrors = /\d+?(?= error)/m.exec(stdout);

        if(nmbOfErrors && parseInt(nmbOfErrors[0]) > 0) {
            throw new Error('You\'ve got some eslint issues in your files');
        }
        console.log(stderr);
    });
    console.log(stderr);
});