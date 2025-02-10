const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  user_Name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  country: { type: String, required: true },
  type: { type: String, default: 'Withdrawal' },
  date: { type: Date, default: Date.now },
  withdrawAmount: { type: Number, required: true },
  bitcoin: { type: String },
});

module.exports = mongoose.model('WithdrawDeposit', WithdrawalSchema);
