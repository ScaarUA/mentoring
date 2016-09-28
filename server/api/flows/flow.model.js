const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const flowSchema = mongoose.Schema({
    state: {
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

flowSchema.plugin(deepPopulate);

module.exports = mongoose.model('Flow', flowSchema);