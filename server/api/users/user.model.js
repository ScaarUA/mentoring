const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password);
};

userSchema.methods.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);