const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const stateSchema = mongoose.Schema({
    image: {
        name: String,
        uploadName: {
            type: String,
            required: true
        },
    },
    hotspots: [
        {
            state: {
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

stateSchema.plugin(deepPopulate);

module.exports = mongoose.model('State', stateSchema);