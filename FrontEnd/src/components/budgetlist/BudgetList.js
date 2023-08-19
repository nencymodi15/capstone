import { useState, useEffect } from "react";
import React from "react";
import "./BudgeList.css";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function BudgetList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const date = new Date();
  const [budget, setBudget] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/budget/findBudget", {
          userid: userid,
        })
        .then((res) => {
          if (res.data.budget) {
            setBudget(res.data.budget);
            res.data.budget.map((b) => {
              console.log(b.enddate);
            });
          } else {
            setBudget("nodata");
          }
        });
    }
  }, []);
  return (
    <div>
      <h1>budgetlist</h1>
      {budget === "nodata" ? (
        <p className='addbudgetacord'>No budget Found</p>
      ) : budget.length > 0 ? (
        budget.map((b) => (
          <div className='budget' key={b._id}>
            <h2 className='budgetcat'>{b.budgetCategory}</h2>
            <p className='amount'>
              <span>amount to spend:</span>
              {b.amount}
            </p>
            <p className='remamount'>
              <span>remaining amount:</span>
              {b.amountRemain}
            </p>
            <p className='samount'>
              <span>amount spend:</span>
              {b.amountSpend}
            </p>
            <p className='enddate'>
              <span>Ending Date:</span>
              {b.enddate}
            </p>
            <p className='description'>
              <span>Motivation:</span>
              {b.description}
            </p>
            <button
              className='delbutton'
              value='delete'
              onClick={() => navigate(`/deletebudget/${b._id}`)}
            >
              delete
            </button>
            <button
              className='editbutton'
              onClick={() => navigate(`/editbudget/${b._id}`)}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No budget data available.</p>
      )}
      <Outlet />
    </div>
  );
}
export default BudgetList;
