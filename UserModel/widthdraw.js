const mongoose = require('mongoose');

const withdrawDepositSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true, // Fixed typo (require -> required)
  },
  user_Name: { 
    type: String,
  },
  email: { 
    type: String,
    required: true, // Email should be required for user identification
  },
  phone: {
    type: String, // Changed to String to accommodate formatting (e.g., "+123456789")
  },
  country: { 
    type: String,
  },
  type: { 
    type: String,
  },
  accountBalance: {
    type: Number,
  }, 
  withdrawAmount: {
    type: Number,
  },
  bitcoin: {
    type: String,
  },
  date: {
    type: Date, // Changed to Date for consistency
    required: true,
    default: Date.now,
  }
}, {
  timestamps: true
});

const WithdrawDeposit = mongoose.model('WithdrawDeposit', withdrawDepositSchema);

module.exports = WithdrawDeposit;
