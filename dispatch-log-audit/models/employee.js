const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  auditHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audit'
    }
  ],
  isAdmin: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Date
  },
  notificationMessageId: {
    type: String
  },
  notificationMessageSentDate: {
    type: Date
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);