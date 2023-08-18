import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./delspend.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function DeleteSpending({ setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Spending, setSpending] = useState([]);
  console.log(id);
  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost:5000/api/spendings/findoneSpending", {
          _id: id,
        })
        .then((res) => {
          console.log(res.data.spending);
          setSpending(res.data.spending);
        })
        .catch((error) => {
          console.error("Error fetching Spending:", error);
        });
    }
  }, []);
  async function deleteone(id) {
    await axios
      .post("http://localhost:5000/api/spendings/deleteSpending", {
        _id: id,
      })
      .then((res) => {
        console.log("coming in the deletepage");
        alert(res.data.message);
      });
    navigate("/");
  }
  return (
    <div>
      <div className='edit-spending'>
        <h1>Edit Spending</h1>
        <div className='spending-details'>
          <div className='detail'>
            <span className='label' htmlFor='SpendingCategory'>
              Category:
            </span>
            <span className='value category'>{Spending.category}</span>
          </div>
          <div className='detail'>
            <span className='label'>Amount:</span>
            <span className='value amount'>{Spending.amount}</span>
          </div>
          <div className='detail'>
            <span className='label'>Date:</span>
            <span className='value date'>{Spending.date}</span>
          </div>
          <button onClick={() => deleteone(Spending._id)}>
            Confirm Delete
          </button>
          <button onClick={() => navigate("/")}>Back to Profile</button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DeleteSpending;
