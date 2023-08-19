import { useState } from "react";
import React from "react";
import axios from "axios";
import "./addgoal.css";
import { useParams } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";

function GoalAdd({ setLoginUser }) {
  const navigate = useNavigate();
  const params = useParams();

  const [goal, setGoal] = useState({
    userid: params.id,
    goal_name: "",
    target_amount: "",
    current_amount: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({
      ...goal,
      [name]: value,
    });
  };
  const Addgoal = () => {
    console.log("coming here");
    const { userid, goal_name, target_amount, current_amount, deadline } = goal;
    console.log(userid, goal_name, target_amount, current_amount, deadline);
    if (userid && goal_name && target_amount && deadline) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/goals/addGoal", goal)
        .then(() => {
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };

  return (
    <div className='add-goal'>
      <h1>this is the add goal page</h1>
      <div className='addgoalform'>
        <h1>Add goal</h1>
        <label htmlFor='goal_name'>goal_name:</label>
        <input
          type='text'
          value={goal.goal_name}
          name='goal_name'
          id='goal_name'
          onChange={handleChange}
        />
        <label htmlFor='target_amount'>Target Amount:</label>
        <input
          type='text'
          name='target_amount'
          value={goal.target_amount}
          id='target_amount'
          onChange={handleChange}
        />
        <label htmlFor='current_amount'>Current Amount:</label>
        <input
          type='text'
          name='current_amount'
          value={goal.current_amount}
          id='current_amount'
          onChange={handleChange}
        />
        <label htmlFor='deadline'>Deadline:</label>
        <input
          type='date'
          name='deadline'
          value={goal.deadline}
          onChange={handleChange}
        />
        <input type='button' value={"Add"} onClick={Addgoal}></input>
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

export default GoalAdd;
