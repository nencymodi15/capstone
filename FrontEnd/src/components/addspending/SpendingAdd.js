import { useState } from "react";
import React from "react";
import axios from "axios";
import "./spendingcss.css";
import { useParams } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

function SpendingAdd({ setLoginUser }) {
  const navigate = useNavigate();
  const params = useParams();

  const [Spending, setSpending] = useState({
    userid: params.id,
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpending({
      ...Spending,
      [name]: value,
    });
  };
  const AddSpending = () => {
    console.log("coming here");
    const { userid, category, amount, date } = Spending;
    console.log(Spending);
    console.log(userid, category, amount, date);
    if (userid && category && amount && date) {
      axios
        .post(
          "https://budgetmate-rutm.onrender.com/api/spendings/addSpending",
          Spending
        )
        .then(() => {
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };

  return (
    <div className='addspending'>
      <h1>this is the add Spending page</h1>
      <div className='addSpending'>
        <h1>Add Spending</h1>
        <label for='category'>Category:</label>
        <select
          name='category'
          value={Spending.category}
          onChange={handleChange}
        >
          <option value=''>select Category</option>
          <option value='gorcery'>grocery</option>
          <option value='impulse'>impulse</option>
          <option value='resturants'>restaurants</option>
          <option value='entertainments'>entertainments</option>
          <option value='house bills'>house bills</option>
          <option value='car Spendings'>car Spendings</option>
        </select>
        <label htmlFor='amount'>Amount:</label>
        <input
          type='text'
          name='amount'
          value={Spending.amount}
          id='amount'
          onChange={handleChange}
        />
        <label htmlFor='date'>date:</label>
        <input
          type='date'
          name='date'
          value={Spending.date}
          onChange={handleChange}
        />
        <input type='button' value={"Add"} onClick={AddSpending}></input>
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

export default SpendingAdd;
