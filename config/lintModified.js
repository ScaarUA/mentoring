/*eslint-disable no-console*/

const exec = require('child_process').exec,
    fs = require('fs');

let ignoreList = fs.readFileSync('.eslintignore', 'utf-8').split('\n');

exec('git diff --cached --name-status --diff-filter=ACM', (err, stdout, stderr) => {
    let modified = stdout.split('\n').map((file) => {
        return file.slice(1).trim();
    });

    modified = modified.filter((file) => {
        return /\.js$/.test(file) && ignoreList.indexOf(file) === -1;
    }).join(' ');

    console.log('modified files:', modified);
    if(modified.indexOf('.js') === -1) {
        return;
    }

    exec(`eslint ${modified}`, (err, stdout, stderr) => {
        console.log(stdout);
        let nmbOfErrors = /\d+?(?= error)/m.exec(stdout);

        if(nmbOfErrors && parseInt(nmbOfErrors[0]) > 0) {
            process.exit(1);
        }
        console.log(stderr);
    });
    console.log(stderr);
});