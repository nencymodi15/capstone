import { useState } from "react";
import React from "react";
import axios from "axios";
import "./budgetadd.css";
import { useParams } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

function BudgetAdd({ setLoginUser }) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  const [budget, setBudget] = useState({
    userid: params.id,
    budgetCategory: "",
    amount: "",
    description: "",
    enddate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget({
      ...budget,
      [name]: value,
    });
  };
  const Addbudget = () => {
    const { userid, budgetCategory, amount, description } = budget;
    console.log(userid, budgetCategory, amount, description);
    if (userid && budgetCategory && amount && description) {
      axios
        .post("http://localhost:5000/api/budget/addBudget", budget)
        .then((res) => {
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };

  return (
    <div className='addbudget'>
      <h1>this is the add budget page</h1>
      <div className='addbudget-form'>
        <h1>Add budget</h1>
        <label for='budgetCategory'>Category:</label>
        <select
          id='budgetCategory'
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
        <label for='amount'>Amount:</label>
        <input
          type='text'
          rows='4'
          cols='50'
          name='amount'
          value={budget.amount}
          id='amount'
          onChange={handleChange}
        />
        <label for='description'>Description:</label>
        <textarea
          rows='4'
          cols='50'
          name='description'
          value={budget.description}
          id='description'
          onChange={handleChange}
        ></textarea>
        <label for='enddate'>End Date:</label>
        <input
          type='date'
          name='enddate'
          value={budget.enddate}
          onChange={handleChange}
        />
        <input type='button' value={"Add"} onClick={Addbudget}></input>
        <label>change your mind </label>
        <input
          type='button'
          value={"back to profile"}
          onClick={() => navigate("/")}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default BudgetAdd;
