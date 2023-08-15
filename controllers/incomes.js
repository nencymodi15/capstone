const { query } = require("express");
const express = require("express");
const Income = require("../models/income");
const Goal = require("../models/goal");
const mongoose = require("mongoose");
const income = require("../models/income");
const app = express();
app.use(express.json());

//path('http://localhost:6000/api/incomes/addIncome')
const addIncome = async (req, res) => {
  const { userid, source, amount, goalName, date } = req.body;

  if (userid && source && amount && goalName) {
    try {
      await saveIncome(userid, source, amount, goalName, date);
      res.send({ message: "Income and Goal updated successfully" });
    } catch (error) {
      console.log(error);
      res.send({ message: "There is an error while inserting data" });
    }
  } else {
    res.send({ message: "There is an error" });
  }
};

async function saveIncome(userid, source, amount, goalName, date) {
  const insertData = new Income({
    userid,
    source,
    amount,
    goalName,
    date,
  });

  try {
    await editGoalAmount(userid, amount, goalName);
    await insertData.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function editGoalAmount(userid, amount, goalName) {
  try {
    const goal = await Goal.findOne({
      userid: userid,
      goal_name: goalName,
    });

    if (goal) {
      var goalamount = parseInt(goal.current_amount);
      var incomeamount = parseInt(amount);
      var newAmount = goalamount + incomeamount;
      const updateGoal = await Goal.findOneAndUpdate(
        { userid: userid, goal_name: goalName },
        { current_amount: newAmount },
        { new: true }
      );

      if (updateGoal) {
        console.log(updateGoal);
      } else {
        console.log("Goal not found");
      }
    } else {
      console.log("Goal not found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//path('http://localhost:6000/api/incomes/findOneIncome')
const findOneIncome = async (res, req) => {
  const { _id } = req.body;
  console.log("receiving id:", _id);

  if (_id) {
    try {
      const income = await Income.findOne({ _id: _id });

      if (income) {
        res.send({ message: "Income found", income: income });
      } else {
        res.send({ message: "Income Not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "An error occurred" });
    }
  } else {
    res.status(400).send({ message: "Missing _id parameter" });
  }
};

//path('http://localhost:6000/api/incomes/findIncome')
const findIncome = async (req, res) => {
  console.log("coming here");
  const { userid } = req.body;
  console.log(userid);
  if (userid) {
    Goal.find({ userid: userid })
      .then((goal) => {
        console.log(userid);
        if (goal.length > 0) {
          console.log(goal);
          res.send({ message: "goals Successfully", goal: goal });
        } else {
          res.send({ message: "goal not found" });
        }
      })
      .catch((err) => {
        return err;
      });
  } else {
    res.send({ message: "user is not available" });
  }
};

//path('http://localhost:6000/api/incomes/deleteIncome')
const deleteIncome = async (req, res) => {
  console.log("coming her");
  const { _id } = req.body;
  console.log(_id);
  Income.findOneAndDelete({ _id: _id })
    .then((income) => {
      console.log(income);
      editgoalAmountagain(income.userid, income.goalName, income.amount);
      console.log(_id);
      console.log(income.userid, income.goalName);
      if (income) {
        res.send({
          message: "Incomes Successfully deleted",
          income: income,
        });
      } else {
        res.send({ message: "Incomes not found" });
      }
    })
    .catch((err) => {
      return err;
    });

  async function editgoalAmountagain(userid, goalname, amount) {
    try {
      const goal = await Goal.findOne({
        userid: userid,
        goal_name: goalname,
      });

      if (goal) {
        var goalamount = parseInt(goal.current_amount);
        var incomeamount = parseInt(amount);
        var newAmount = goalamount - incomeamount;
        console.log(newAmount);
        const updatedgoal = await Goal.findOneAndUpdate(
          { userid: userid, goal_name: goal.goal_name },
          { current_amount: newAmount },
          { new: true }
        );

        if (updatedgoal) {
          console.log(updatedgoal);
        } else {
          console.log("goal not found");
        }
      } else {
        console.log("goal not found");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//path('http://localhost:6000/api/incomes/updateIncome')
const updateIncome = async (req, res) => {
  const { userid, source, amount, goalName, date, createdAt, _id } = req.body;

  if (source && amount && goalName && _id) {
    try {
      const updatedIncome = await Income.findOneAndUpdate(
        { _id: _id },
        { userid, source, amount, goalName, date, createdAt },
        { new: true }
      );

      if (updatedIncome) {
        res.send({
          message: "Income successfully updated",
          Income: updatedIncome,
        });
      } else {
        res.send({ message: "Income not found" });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: "There was an error updating the Income" });
    }
  } else {
    res.send({ message: "Missing required fields" });
  }
};

module.exports = {
  addIncome,
  findOneIncome,
  findIncome,
  deleteIncome,
  updateIncome,
};
