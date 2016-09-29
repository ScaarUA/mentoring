const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const stateSchema = Schema({
    image: {
        name: String,
        uploadName: {
            type: String,
            required: true
        },
    },
    hotspots: [
        {
            stateId: Schema.ObjectId,
            title: String,
            description: String,
            x1: Number,
            y1: Number,
            x2: Number,
            y2: Number
        }
    ],
    title: {
        type: String,
        require: true
    },
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