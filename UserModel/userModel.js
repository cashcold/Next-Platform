const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_Name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    country: { type: String, required: true },
    referrer: { type: String, default: null },
    accountBalance: { type: Number, default: 0 },
    refferReward: { type: Number, default: 0 },  // ✅ Ensure this exists
    offer: { type: Number, default: 0 },  // ✅ Ensure this exists
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
