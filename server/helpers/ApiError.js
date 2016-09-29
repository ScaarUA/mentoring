module.exports = function (message, status) {
    const error = new Error(message);

    error.message = message;
    error.status = status;
    return error;
};