module.exports = {
    error: logger.bind(null, '\x1b[36m%s\x1b[0m'),
    success: logger.bind(null, '\x1b[32m%s\x1b[0m'),
    info: logger.bind(null, '\x1b[33m%s\x1b[0m')
};

function logger(color, value) {
    let parsedValue;

    if(typeof value === 'object') {
        parsedValue = JSON.stringify(value).replace(/([,{}:])/g, '$1 ');
    } else {
        parsedValue = value;
    }

    console.log(color, parsedValue); //eslint-disable-line
}