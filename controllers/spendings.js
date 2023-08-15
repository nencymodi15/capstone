const { query } = require("express");
const spending = require("../models/spending");
const Budget = require("../models/budget");
const mongoose = require("mongoose");

//path('http://localhost:6000/api/spendings/addSpending')
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
      createdAt,
    });

    try {
      await spending
        .insertMany(insertdata)
        .then(res.send({ message: "successfull" }));
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
        console.log(budget.amount, amount);

        if (budget.amount > amount) {
          var newAmount = budget.amount - amount;
          console.log(newAmount);
          const updatedBudget = await Budget.findOneAndUpdate(
            { userid: userid, budgetCategory: category },
            { amount: newAmount },
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
};

//path('http://localhost:6000/api/spendings/findSpending')
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
//path('http://localhost:6000/api/spendings/findoneSpending')
const findoneSpending = (req, res) => {
  console.log("coming her");
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
//path('http://localhost:6000/api/spendings/deleteSpending')
const deleteSpending = (req, res) => {
  console.log("coming her");
  const { _id } = req.body;
  spending
    .deleteOne({ _id: _id })
    .then((spending) => {
      console.log(_id);
      if (spending) {
        editbudgetAmountagain();
        res.send({
          message: "spendings Successfully deleted",
          spending: spending,
        });
      } else {
        res.send({ message: "spendings not found" });
      }
    })
    .catch((err) => {
      return err;
    });

  async function editbudgetAmountagain() {
    try {
      const budget = await Budget.findOne({
        userid: userid,
        budgetCategory: category,
      });

      if (budget) {
        console.log(budget.amount, amount);

        if (budget.amount > amount) {
          var newAmount = budget.amount + amount;
          console.log(newAmount);
          const updatedBudget = await Budget.findOneAndUpdate(
            { userid: userid, budgetCategory: category },
            { amount: newAmount },
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
};

module.exports = {
  findSpending,
  addSpending,
  findoneSpending,
  deleteSpending /*,updateSpending*/,
};
