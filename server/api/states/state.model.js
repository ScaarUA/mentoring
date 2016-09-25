const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    image: {
        title: String,
        path: String,
        required: true
    },
    hotspots: [
        {
            stateId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'State'
            },
            title: String,
            description: String,
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number
        }
    ],
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

module.exports = mongoose.model('State', stateSchema);