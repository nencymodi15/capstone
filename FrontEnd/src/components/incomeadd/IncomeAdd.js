import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./incomeadd.css";
import { useParams } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

function IncomeAdd({ setLoginUser }) {
  const navigate = useNavigate();
  const params = useParams();

  const [Income, setIncome] = useState({
    userid: params.id,
    source: "",
    amount: "",
    goalName: "",
    date: "",
  });
  const [Goal, setGoal] = useState([]);
  useEffect(() => {
    if (params.id) {
      axios
        .post("http://localhost:5000/api/goals/FindGoal", { userid: params.id })
        .then((res) => {
          if (res.data.goals) {
            setGoal(res.data.goals);
          } else {
            setGoal("nodata");
          }
        })
        .catch((error) => {
          console.error("Error fetching goals:", error);
        });
    }
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome({
      ...Income,
      [name]: value,
    });
  };
  const AddIncome = () => {
    console.log("coming here");
    const { userid, source, amount, goalName, date } = Income;
    console.log(userid, source, amount, goalName, date);
    console.log(Income);
    console.log(userid, source, amount, goalName, date);
    if (userid && source && goalName && amount && date) {
      axios
        .post("http://localhost:5000/api/incomes/addIncome", Income)
        .then(() => {
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };

  return (
    <div className='income-list'>
      <h1>Add Income</h1>
      <div className='add-income'>
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
        <label className='input-label' htmlFor='goalName'>
          Goal Name:
        </label>
        <select
          className='select-field'
          name='goalName'
          value={Income.goalName}
          onChange={handleChange}
        >
          <option value=''>Select Category</option>
          {Goal === "nodata" ? (
            <option value=''>No Goal Found</option>
          ) : Goal.length > 0 ? (
            Goal.map((g) => (
              <option key={g.goal_name} value={g.goal_name}>
                {g.goal_name}
              </option>
            ))
          ) : (
            <option value=''>No Income data available.</option>
          )}
        </select>

        <label className='input-label' htmlFor='amount'>
          Amount:
        </label>
        <input
          className='input-field'
          type='text'
          name='amount'
          value={Income.amount}
          id='amount'
          onChange={handleChange}
        />
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
        <button className='add-button' onClick={AddIncome}>
          Add
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

export default IncomeAdd;
