const { query } = require("express");
const Budget = require("../models/budget");
const mongoose = require("mongoose");

//path('https://budgetmate-rutm.onrender.com/api/budget/findBudget/')
const findBudget = (req, res) => {
  const { userid } = req.body;
  if (userid) {
    Budget.find({ userid: userid })
      .then((budget) => {
        if (budget.length > 0) {
          res.send({ message: "budgets Successfully", budget: budget });
        } else {
          res.send({ message: "Budget not found" });
        }
      })
      .catch((err) => {
        return err;
      });
  } else {
    res.send({ message: "useris not available" });
  }
};

//path('https://budgetmate-rutm.onrender.com/api/budget/addBudget/')
const addbudget = (req, res) => {
  const { userid, budgetCategory, description, amount, enddate, createdAt } =
    req.body;
  if (userid && amount && description) {
    savebudget();
    async function savebudget() {
      const insertdata = new Budget({
        userid,
        budgetCategory,
        description,
        amount,
        enddate,
        createdAt,
      });
      try {
        await Budget.insertMany(insertdata);
        res.send({ message: "successfully budget Created" });
      } catch {
        res.send({ message: "there is an error" });
      }
    }
  } else {
    res.send({ message: "there is an error" });
  }
};

//path('https://budgetmate-rutm.onrender.com/api/budget/findeoneBudget/')
const findeoneBudget = (req, res) => {
  const { _id } = req.body;
  Budget.findOne({ _id: _id })
    .then((budget) => {
      if (budget) {
        res.send({ message: "budgets found", budget: budget });
      } else {
        res.send({ message: "Budget not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};

//path('https://budgetmate-rutm.onrender.com/api/budget/deleteoneBudget/')
const deleteoneBudget = (req, res) => {
  const { _id } = req.body;
  Budget.findOneAndDelete({ _id: _id })
    .then((budget) => {
      if (budget) {
        res.send({ message: "budgets Successfully deleted", budget: budget });
      } else {
        res.send({ message: "Budget not found" });
      }
    })
    .catch((err) => {
      return err;
    });
};

//path('https://budgetmate-rutm.onrender.com/api/budget/updateBudget/')
const updateBudget = async (req, res) => {
  const {
    _id,
    userid,
    budgetCategory,
    description,
    amount,
    enddate,
    createdAt,
  } = req.body;
  console.log(req.body);

  if (userid && amount && description && _id) {
    try {
      const updatedBudget = await Budget.findOneAndUpdate(
        { _id: _id },
        { userid, budgetCategory, description, amount, enddate, createdAt },
        { new: true }
      ).exec(); // Execute the query to get the updated document

      console.log(updatedBudget);

      if (updatedBudget) {
        res.send({
          message: "Budget successfully updated",
          budget: updatedBudget,
        });
      } else {
        res.send({ message: "Budget not found" });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: "There was an error updating the budget" });
    }
  } else {
    res.send({ message: "Missing required fields" });
  }
};

module.exports = {
  findBudget,
  addbudget,
  findeoneBudget,
  deleteoneBudget,
  updateBudget,
};
