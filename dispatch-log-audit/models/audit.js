const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
  auditDate: {
    type: Date,
    default: Date.now
  },
  auditStatus: {
    type: String,
    default: "OPEN"
  },
  auditInProgress: {
    type: Boolean,
    default: true
  },
  callNumber: {
    type: String,
    required: true
  },
  calltakerName: {
    type: String,
    required: true
  },
  callDate: {
    type: Boolean,
    required: true
  },
  callReason: {
    type: Boolean,
    required: true
  },
  callLocation: {
    type: Boolean,
    required: true
  },
  callAction: {
    type: Boolean,
    required: true
  },
  criticalErrors: {
    type: Boolean,
    required: true
  },
  flagForReview: {
    type: Boolean
  },
  auditorComments: {
    type: String
  },
  employeeComments: {
    type: String
  },
  employeeReviewedAudit: {
    type: Boolean,
    default: false
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
});

module.exports = mongoose.model('Audit', AuditSchema)