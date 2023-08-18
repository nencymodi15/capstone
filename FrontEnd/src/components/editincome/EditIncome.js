import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./editincome.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function EditIncome({ setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [Income, setIncome] = useState({
    userid: "",
    source: "",
    amount: "",
    goalName: "",
    date: "",
  });
  useEffect(() => {
    console.log("coming in the use effect");
    if (id) {
      axios
        .post("http://localhost:5000/api/incomes/findOneIncome", { _id: id })
        .then((res) => {
          console.log(res.data.income);
          setIncome(res.data.income);
        })
        .catch((error) => {
          console.error("Error fetching income:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...Income,
      [name]: value,
    });
  };
  const EditIncome = () => {
    const { _id, userid, incomeCategory, amount, description } = Income;
    console.log(userid, incomeCategory, amount, description);
    if (userid && incomeCategory && amount && description) {
      axios
        .post("http://localhost:5000/api/income/editIncome", Income)
        .then((res) => {
          console.log(res.data.message);
          alert(res.data.message);
          setIncome(res.data.income);
          axios("http://localhost:5000/api/users/finduser", Income.userid).then(
            (res) => {
              navigate("/");
              setLoginUser(res.data.user);
            }
          );
        });
    } else {
      alert("invalid post");
    }
  };

  return (
    <div className='edit-income'>
      <h1>Edit Income</h1>
      <div className='edit-income-form'>
        <label className='input-label' htmlFor='source'>
          Source:
        </label>
        <input
          className='input-field'
          type='text'
          name='source'
          value={Income.source}
          id='source'
          onChange={handleChange}
        />
        <p className='instruction'>
          If you want to edit the goal name, please delete this Income and add a
          new Income.
        </p>
        <label className='label' htmlFor='goalName'>
          Goal Name: <span className='value'>{Income.goalName}</span>
        </label>
        <p className='instruction'>
          If you want to edit the amount, please delete this Income and add a
          new Income.
        </p>
        <label className='label' htmlFor='amount'>
          Amount: <span className='value'>{Income.amount}</span>
        </label>
        <label className='input-label' htmlFor='date'>
          Date:
        </label>
        <input
          className='input-field'
          type='date'
          name='date'
          value={Income.date}
          onChange={handleChange}
        />
        <button className='edit-button' onClick={EditIncome}>
          Edit
        </button>
        <p>Changed your mind?</p>
        <button className='back-button' onClick={() => navigate("/")}>
          Back to Profile
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default EditIncome;
