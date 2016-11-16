const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const stateSchema = Schema({
    image: {
        onCloud: Boolean,
        name: String,
        public_id: String,
        path: {
            type: String,
            required: true
        }
    },
    hotspots: [
        {
            stateId: Schema.ObjectId,
            title: String,
            description: String,
            x: Number,
            y: Number
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
    },
    flow: {
        type: Schema.ObjectId,
        ref: 'Flow'
    }
});

module.exports = mongoose.model('State', stateSchema);