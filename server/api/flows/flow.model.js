const mongoose = require('mongoose');

const flowSchema = mongoose.Schema({
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
    title: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Flow', flowSchema);