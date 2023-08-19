import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./deletebudget.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function DeleteBudget({ setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [budget, setBudget] = useState([]);
  console.log(id);
  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost:5000/api/budget/findOneBudget", { _id: id })
        .then((res) => {
          console.log(res.data.budget);
          setBudget(res.data.budget);
        })
        .catch((error) => {
          console.error("Error fetching budget:", error);
        });
    }
  }, []);
  async function deleteone(id) {
    await axios
      .post("http://localhost:5000/api/budget/deleteBudget", {
        _id: id,
      })
      .then((res) => {
        console.log("coming in the deletepage");
      });
    navigate("/");
  }
  return (
    <div className='deletebudget'>
      <h1>Edit Budget</h1>
      <div className='budgets'>
        <label htmlFor='budgetCategory'>Category:</label>
        <span className='budgetCategory'>{budget.budgetCategory}</span>
        <label>Amount:</label>
        <span name='amount'>{budget.amount}</span>
        <label>Description:</label>
        <span className='description'>{budget.description}</span>
        <label>End Date:</label>
        <span className='enddate'>{budget.enddate}</span>
        <button onClick={() => deleteone(budget._id)}>Confirm Delete</button>
        <button onClick={() => navigate("/")}>Back to Profile</button>
        <Outlet />
      </div>
    </div>
  );
}
export default DeleteBudget;
