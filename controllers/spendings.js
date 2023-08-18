const { query } = require("express");
const spending = require("../models/spending");
const Budget = require("../models/budget");
const mongoose = require("mongoose");

//path('http://localhost:5000/api/spendings/addSpending')
const addSpending = async (req, res) => {
  console.log("coming here");
  const { userid, category, amount, date, createdAt } = req.body;
  if (userid && amount && category) {
    savespendings();
    await editbudgetAmount(); // Use await to ensure that editbudgetAmount finishes before continuing
  } else {
    res.send({ message: "there is an error" });
  }

  async function savespendings() {
    const insertdata = new spending({
      userid,
      category,
      amount,
      date,
      amountRemain: amount,
      createdAt,
    });

    try {
      await spending.insertMany(insertdata);
    } catch (error) {
      res.send({ message: "There is an error" });
    }
  }

  async function editbudgetAmount() {
    try {
      const budget = await Budget.findOne({
        userid: userid,
        budgetCategory: category,
      });

      if (budget) {
        if (budget.amount > amount) {
          var newAmount = budget.amount - amount;
          var Amountr = budget.amountRemain - amount;
          var Amounts = budget.amountSpend + amount;
          const updatedBudget = await Budget.findOneAndUpdate(
            { userid: userid, budgetCategory: category },
            { amount: newAmount, amountRemain: Amountr, amountSpend: Amounts },
            { new: true } // To return the updated document
          );
          if (updatedBudget !== null) {
            res.send({ message: "successfull" });
          } else {
            res.send({ message: "Budget not found" });
          }
        } else {
          res.send({
            message:
              "You spend over your budget create budget for tracking your spending",
          });
        }
      } else {
        res.send({ message: "Budget not found" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//path('http://localhost:5000/api/spendings/findSpending')
const findSpending = (req, res) => {
  const { userid } = req.body;
  spending
    .find({ userid: userid })
    .then((spendings) => {
      if (spendings) {
        res.send({ message: "budgets Successfully", spendings: spendings });
      } else {
        res.send({ message: "Spenings not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};
//path('http://localhost:5000/api/spendings/findoneSpending')
const findoneSpending = (req, res) => {
  const { _id } = req.body;
  spending
    .findOne({ _id: _id })
    .then((spending) => {
      if (spending) {
        res.send({ message: "Spendings found", spending: spending });
      } else {
        res.send({ message: "Spending Not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};
//path('http://localhost:5000/api/spendings/deleteSpending')
const deleteSpending = (req, res) => {
  const { _id } = req.body;
  spending
    .findOneAndDelete({ _id: _id })
    .then(async (spending) => {
      if (spending) {
        const userId = spending.userid;
        const category = spending.category;
        await editbudgetAmountagain(userId, category, spending.amount, res);
      } else {
        console.log("there is an error while deleting ");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "An error occurred." });
    });
};

async function editbudgetAmountagain(userid, category, amount, res) {
  try {
    const budget = await Budget.findOne({
      userid: userid,
      budgetCategory: category,
    });

    if (budget) {
      if (budget.amount > amount) {
        var newAmount = budget.amount + amount;
        var Amountr = budget.amountRemain + amount;
        var Amounts = budget.amountSpend - amount;
        const updatedBudget = await Budget.findOneAndUpdate(
          { userid: userid, budgetCategory: category },
          { amount: newAmount, amountRemain: Amountr, amountSpend: Amounts },
          { new: true } // To return the updated document
        );

        if (updatedBudget) {
          res.send({
            message: "Budget successfully updated",
            budget: updatedBudget,
          });
        } else {
          res.send({ message: "Budget not found" });
        }
      } else {
        res.send({ message: "You spend over your budget" });
      }
    } else {
      res.send({ message: "Budget not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findSpending,
  addSpending,
  findoneSpending,
  deleteSpending /*,updateSpending*/,
};
