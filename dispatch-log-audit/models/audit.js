const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
  auditDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Audit', AuditSchema)