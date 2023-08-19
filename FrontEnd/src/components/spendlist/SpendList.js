import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./spendlist.css";
import { Outlet, useNavigate } from "react-router-dom";

function SpendingList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const [spending, setSpending] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post(
          "https://budgetmate-rutm.onrender.com/api/spendings/FindSpending",
          {
            userid: userid,
          }
        )
        .then((res) => {
          console.log();
          if (res.data.spendings) {
            setSpending(res.data.spendings);
          } else {
            setSpending("nodata");
          }
        })
        .catch((error) => {
          console.error("Error fetching spendings:", error);
        });
    }
  }, [userid]);

  return (
    <div className='spendlist'>
      <h1>spendinglist</h1>
      {spending === "nodata" ? (
        <p>No spending Found</p>
      ) : spending.length > 0 ? (
        spending.map((s) => (
          <div className='spending' key={s._id}>
            <h2 className='Category'>{s.category}</h2>
            <p className='amount'>
              <span>amount Spend:</span>
              {s.amount}
            </p>
            <p className='date'>
              <span>Ending Date:</span>
              {s.date}
            </p>
            <button
              className='deleteS-button'
              value='delete'
              onClick={() => navigate(`/deletespending/${s._id}`)}
            >
              delete
            </button>
          </div>
        ))
      ) : (
        <p>No spending data available.</p>
      )}
      <Outlet />
    </div>
  );
}
export default SpendingList;
