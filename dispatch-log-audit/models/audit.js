const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
  auditDate: {
    type: Date,
    default: Date.now
  },
  callNumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Audit', AuditSchema)