const mongoose = require('mongoose'),
    deepPopulate = require('mongoose-deep-populate')(mongoose);

let projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
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

projectSchema.plugin(deepPopulate);

module.exports = mongoose.model('Project', projectSchema);