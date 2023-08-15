const mongoose = require("mongoose");

const spendingSchema = new mongoose.Schema({
  userid:{
    type: String, 
    required: [true,"user id is not provided"]
  },
  category:{
    type: String,
    required: [true,"Category must be provided"]
  },
  amount:{
    type: String,
    required: [true,"amount must be provided"]
  },
  date:{
    type: String,
    required:[true,"date must be provided"]
  },
  image:{
    type: String
  },
  createdAt:{
    type:Date,
    default: Date.now(),
  }
})

module.exports = mongoose.model("Spending",spendingSchema);
