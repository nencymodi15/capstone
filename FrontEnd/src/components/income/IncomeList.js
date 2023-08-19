import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./incomelist.css";
import { Outlet, useNavigate } from "react-router-dom";

function IncomeList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const [Income, setIncome] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/Incomes/FindIncome", {
          userid: userid,
        })
        .then((res) => {
          if (res.data.income) {
            setIncome(res.data.income);
          } else {
            setIncome("nodata");
          }
        })
        .catch((error) => {
          console.error("Error fetching Incomes:", error);
        });
    }
  }, [userid]);

  return (
    <div className='income-list'>
      <h1>Income List</h1>
      {Income === "nodata" ? (
        <p>No Income Found</p>
      ) : Income.length > 0 ? (
        Income.map((i) => (
          <div className='income' key={i._id}>
            <h2 className='source'>{i.source}</h2>
            <p className='goal-name'>
              <span>Goal Name:</span> {i.goalName}
            </p>
            <p className='amount'>
              <span>Amount to Spend:</span> {i.amount}
            </p>
            <p className='date'>
              <span>Entry Date:</span> {i.date}
            </p>
            <button
              className='delete-button'
              onClick={() => navigate(`/deleteincome/${i._id}`)}
            >
              Delete
            </button>
            <button
              className='edit-button'
              onClick={() => navigate(`/editincome/${i._id}`)}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No Income data available.</p>
      )}
      <Outlet />
    </div>
  );
}
export default IncomeList;
