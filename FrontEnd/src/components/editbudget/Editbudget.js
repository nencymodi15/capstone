import { useState, useEffect } from "react";
import React from "react";
import "./editbudget.css";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function EditBudget({ setLoginUser, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [budget, setBudget] = useState({
    userid: "",
    budgetCategory: "",
    amount: "",
    description: "",
    enddate: "",
  });
  useEffect(() => {
    console.log("coming in the use effect");
    if (id) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/budget/findOneBudget", {
          _id: id,
        })
        .then((res) => {
          console.log(res.data.budget);
          setBudget(res.data.budget);
        })
        .catch((error) => {
          console.error("Error fetching budget:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget({
      ...budget,
      [name]: value,
    });
  };
  const editbudget = () => {
    const { _id, userid, budgetCategory, amount, description, enddate } =
      budget;
    console.log(_id, userid, budgetCategory, amount, description, enddate);
    if ((userid && budgetCategory && amount && description, enddate)) {
      axios
        .post(
          "https://budgetmate-rutm.onrender.com/api/budget/editBudget",
          budget
        )
        .then((res) => {
          console.log(res.data.message);
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };
  return (
    <div className='edit-budget'>
      <h1>Edit Budget</h1>
      <div className='editbudget'>
        <label htmlFor='budgetCategory'>Category:</label>
        <select
          name='budgetCategory'
          value={budget.budgetCategory}
          onChange={handleChange}
        >
          <option value=''>select Category</option>
          <option value='gorcery'>grocery</option>
          <option value='impulse'>impulse</option>
          <option value='resturants'>restaurants</option>
          <option value='entertainments'>entertainments</option>
          <option value='house bills'>house bills</option>
          <option value='car spendings'>car spendings</option>
        </select>
        <label htmlFor='amount'>Amount:</label>
        <input
          type='text'
          name='amount'
          value={budget.amount}
          onChange={handleChange}
        />
        <label htmlFor='description'>Description:</label>
        <textarea
          name='description'
          value={budget.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='enddate'>End Date:</label>
        <input
          type='date'
          name='enddate'
          value={budget.enddate}
          onChange={handleChange}
        />
        <input type='button' value={"Edit"} onClick={editbudget}></input>
        <button onClick={() => navigate("/")}>Back to Profile</button>
        <Outlet />
      </div>
    </div>
  );
}
export default EditBudget;
