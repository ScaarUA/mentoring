const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const flowSchema = Schema({
    stateId: {
        type: Schema.ObjectId,
        required: true
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