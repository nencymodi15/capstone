const { query } = require("express");
const Goal = require("../models/goal");
const mongoose = require("mongoose");

//path('http://localhost:5000/api/goals/addGoal')
const addGoal = async (req, res) => {
  const {
    userid,
    goal_name,
    target_amount,
    current_amount,
    deadline,
    daysRemaining,
    createdAt,
  } = req.body;
  if (userid && goal_name && target_amount && deadline) {
    savegoals();
  } else {
    res.send({ message: "something is missing" });
  }

  async function savegoals() {
    const insertdata = new Goal({
      userid,
      goal_name,
      target_amount,
      current_amount,
      deadline,
      daysRemaining,
      createdAt,
    });

    try {
      await Goal.insertMany(insertdata).then(
        res.send({ message: "successfull" })
      );
    } catch (error) {
      res.send({ message: error });
    }
  }
};
//path('http://localhost:5000/api/goals/FindGoal')
const FindGoal = async (req, res) => {
  const { userid } = req.body;
  Goal.find({ userid: userid })
    .then((goals) => {
      if (goals.length > 0) {
        res.send({ message: "budgets Successfully", goals: goals });
      } else {
        res.send({ message: "Budget not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};
//path('http://localhost:5000/api/goals/findoneGoal')
const findoneGoal = async (req, res) => {
  const { _id } = req.body;
  Goal.findOne({ _id: _id })
    .then((goal) => {
      if (goal) {
        res.send({ message: "goal found", goal: goal });
      } else {
        res.send({ message: "goal not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};
//path('http://localhost:5000/api/goals/deleteGoal')
const deleteGoal = async (req, res) => {
  const { _id } = req.body;
  Goal.deleteOne({ _id: _id })
    .then((goal) => {
      if (goal) {
        res.send({ message: "Goal is deleted", goal: goal });
      } else {
        res.send({ message: "Goal not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};

//path('http://localhost:5000/api/goals/updateGoal')
const updateGoal = async (req, res) => {
  const {
    _id,
    userid,
    goal_name,
    target_amount,
    current_amount,
    deadline,
    daysRemaining,
    createdAt,
  } = req.body;

  if (userid && target_amount && goal_name && _id) {
    try {
      // Assuming goal is a Mongoose model
      const updatedGoal = await Goal.findOneAndUpdate(
        { _id: _id },
        {
          userid,
          goal_name,
          target_amount,
          current_amount,
          deadline,
          daysRemaining,
          createdAt,
        },
        { new: true }
      );

      if (updatedGoal) {
        res.send({ message: "Goal has been updated", Goal: updatedGoal });
      } else {
        res.send({ message: "Goal not found" });
      }
    } catch (error) {
      console.log(error);
      res.send({ message: "Error updating goal" });
    }
  } else {
    res.send({ Message: "Missing required fields" });
  }
};

module.exports = {
  addGoal,
  FindGoal,
  findoneGoal,
  deleteGoal,
  updateGoal,
};
