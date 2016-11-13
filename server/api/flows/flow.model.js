const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    deepPopulate = require('mongoose-deep-populate')(mongoose);

const flowSchema = Schema({
    states: [
        {
            type: Schema.ObjectId,
            ref: 'State'
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

flowSchema.plugin(deepPopulate);

module.exports = mongoose.model('Flow', flowSchema);