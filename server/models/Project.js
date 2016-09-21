const mongoose = require('mongoose');

let projectSchema = mongoose.Schema({
    name: String,
    isOpen: Boolean,
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