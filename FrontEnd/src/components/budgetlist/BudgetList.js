import { useState, useEffect } from "react";
import React from "react";
import "./BudgeList.css";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function BudgetList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const [budget, setBudget] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post("http://localhost:5000/api/budget/findBudget", { userid: userid })
        .then((res) => {
          if (res.data.budget) {
            setBudget(res.data.budget);
          } else {
            setBudget("nodata");
          }
        });
    }
  }, []);

  async function deleteone(_id) {
    console.log("coming this way");
    axios
      .post("http://localhost:5000/api/budget/deleteBudget", { _id: _id })
      .then((res) => {
        axios("http://localhost:5000/api/users/finduser", budget.userid).then(
          (res) => {
            setLoginUser(res.data.user);
            navigate("/");
          }
        );
      });
  }

  return (
    <div>
      <h1>budgetlist</h1>
      {budget === "nodata" ? (
        <p>No budget Found</p>
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
              {b.amount}
            </p>
            <p className='samount'>
              <span>amount spend:</span>
              {b.amount}
            </p>
            <p className='enddate'>
              <span>Ending Date:</span>
              {b.enddate}
            </p>
            <p className='description'>
              <span>Motivation:</span>
              {b.description}
            </p>
            <p className='remdays'>
              <span>Remaining Days:</span>
              {b.amount}
            </p>
            <button
              className='delbutton'
              value='delete'
              onClick={() => deleteone(b._id)}
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
