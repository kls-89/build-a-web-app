const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    totalDetailsWorked: {
        type: Number
    },
    employmentStatus: {
        type: String,
        required: true
    },

    defaultDetailOrder: {
        type: Number,
        required: true
    },
    eligibleToWork: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Officer', OfficerSchema);