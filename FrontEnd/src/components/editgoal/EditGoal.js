import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./editgoal.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function EditGoal({ setLoginUser, user }) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [goal, setGoal] = useState({
    userid: "",
    goal_name: "",
    target_amount: "",
    current_amount: "",
    deadline: "",
  });
  useEffect(() => {
    console.log("coming in the use effect");
    if (id) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/goals/findoneGoal", {
          _id: id,
        })
        .then((res) => {
          console.log(res.data.goal);
          setGoal(res.data.goal);
        })
        .catch((error) => {
          console.error("Error fetching goal:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({
      ...goal,
      [name]: value,
    });
  };
  const editgoal = () => {
    const { _id, userid, goal_name, target_amount, current_amount, deadline } =
      goal;
    console.log(userid, goal_name, target_amount, current_amount, deadline);
    if (userid && goal_name && target_amount && deadline) {
      axios
        .post("https://budgetmate-rutm.onrender.com/api/goals/updateGoal", goal)
        .then(() => {
          navigate("/");
        });
    } else {
      alert("invalid post");
    }
  };
  return (
    <div className='edit-goal'>
      <h1>Edit Goal</h1>
      <div className='edit-goal-form'>
        <h2>Edit Your Goal</h2>
        <label className='input-label' htmlFor='goal_name'>
          Goal Name:
        </label>
        <input
          className='input-field'
          type='text'
          value={goal.goal_name}
          name='goal_name'
          id='goal_name'
          onChange={handleChange}
        />
        <label className='input-label' htmlFor='target_amount'>
          Target Amount:
        </label>
        <input
          className='input-field'
          type='text'
          name='target_amount'
          value={goal.target_amount}
          id='target_amount'
          onChange={handleChange}
        />
        <label className='input-label' htmlFor='current_amount'>
          Current Amount:
        </label>
        <input
          className='input-field'
          type='text'
          name='current_amount'
          value={goal.current_amount}
          id='current_amount'
          onChange={handleChange}
        />
        <label className='input-label' htmlFor='deadline'>
          Deadline:
        </label>
        <input
          className='input-field'
          type='date'
          name='deadline'
          value={goal.deadline}
          onChange={handleChange}
        />
        <button className='update-button' onClick={editgoal}>
          Update
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
export default EditGoal;
