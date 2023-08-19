import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./deleteincome.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function DeleteIncome({ setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Income, setIncome] = useState([]);
  useEffect(() => {
    if (id) {
      axios
        .post(
          "https://budgetmate-rutm.onrender.com/api/incomes/findOneIncome",
          {
            _id: id,
          }
        )
        .then((res) => {
          setIncome(res.data.income);
        })
        .catch((error) => {
          console.error("Error fetching Income:", error);
        });
    }
  }, []);
  async function deleteone(_id) {
    axios
      .post("https://budgetmate-rutm.onrender.com/api/incomes/deleteIncome", {
        _id: _id,
      })
      .then(() => {
        navigate("/");
      });
  }
  return (
    <div className='deleteincome'>
      <h1>Edit Income</h1>
      <div className='editIncome'>
        <label htmlFor='source'>source:</label>
        <label className='source'>{Income.source}</label>
        <label htmlFor='goalName'>goalName:</label>
        <label className='goalName'>{Income.goalName}</label>
        <label>Amount:</label>
        <label name='amount'>{Income.amount}</label>
        <label>Date:</label>
        <label className='date'>{Income.date}</label>
        <button onClick={() => deleteone(Income._id)}>Confirm Delete</button>
        <button onClick={() => navigate("/")}>Back to Profile</button>
        <Outlet />
      </div>
    </div>
  );
}
export default DeleteIncome;
