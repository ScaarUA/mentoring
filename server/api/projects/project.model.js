const mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    readers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    editors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    flows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flow'
        }
    ]
});

module.exports = mongoose.model('Project', projectSchema);