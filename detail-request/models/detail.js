const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DetailSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },

    calltakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Calltaker'
    },

    detailDate: {
        type: Date,
        required: true
    },

    detailStartTime: {
        type: Date,
        required: true
    },

    asapStart: {
        type: Boolean
    },

    detailEndTime: {
        type: Date
    },

    streetOneNumber: {
        type: Number
    },
    streetOneName: {
        type: String,
        required: true
    },
    streetOneSuffix: {
        type: String
    },
    streetTwoNumber: {
        type: Number
    },
    streetTwoName: {
        type: String
    },
    streetTwoSuffix: {
        type: String
    },
    numberOfficers: {
        type: Number,
        required: true
    },
    requestor: {
        name: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        }
    },
    officerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Officer'
    }

});

module.exports = mongoose.model('Detail', DetailSchema);