const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: [true, "userid must be provided"],
  },
  source: {
    type: String,
  },
  goalName: {
    type: String,
    required: [true, "Amount must be Provided"],
  },
  amount: {
    type: Number,
    required: [true, "Amount must be Provided"],
  },
  date: {
    type: Date,
    required: [true, "Date must be Provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("income", incomeSchema);
