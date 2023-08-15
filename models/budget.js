const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userid:{
    type: String, 
    required: [true,"userid must be provided"]
  },
  budgetCategory:{
    type: String, 
    required: [true,"Category must be provided"]
  },
  description:{
    type: String,
    required: true
  },
  amount:{
    type:Number,
    required: [true,"Amount must be Provided"]
  },
  amountSpend:{
    type:Number
  },
  amountRemain:{
    type:Number
  },
  enddate:{
    type:Date,
    required:[true,"end date is required"]
  },
  createdAt:{
    type:Date,
    default: Date.now(),
  }
})
module.exports = mongoose.model("Budget",budgetSchema);