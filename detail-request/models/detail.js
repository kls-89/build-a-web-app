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
        type: String,
        required: true
    },

    detailDuration: {
        type: String,
        required: true
    },

    asapStart: {
        type: Boolean
    },

    detailLocation: {
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
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
        }
    },

    numberOfficers: {
        type: Number,
        required: true
    },

    requestor: {
        billingCompany: {
            type: String,
            required: true
        },
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
    },
    filled: {
        type: Boolean,
        required: true,
        default: false
    },
    notes: {
        type: String
    }

});

module.exports = mongoose.model('Detail', DetailSchema);