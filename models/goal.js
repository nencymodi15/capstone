const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: [true, "userid must be provided"],
  },
  goal_name: {
    type: String,
    required: [true, "goal name must be provided"],
  },
  target_amount: {
    type: Number,
    required: [true, "target amount must be provided"],
  },
  current_amount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
    required: [true, "deadline must be provided"],
  },
  daysRemaining: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Goal", goalSchema);
