import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./delgoal.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function DeleteGoal({ setLoginUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Goal, setGoal] = useState([]);
  console.log(id);
  useEffect(() => {
    if (id) {
      axios
        .post("http://localhost:5000/api/goals/findoneGoal", {
          _id: id,
        })
        .then((res) => {
          console.log(res.data.goal);
          setGoal(res.data.goal);
        })
        .catch((error) => {
          console.error("Error fetching Goal:", error);
        });
    }
  }, []);
  async function deleteone(id) {
    await axios
      .post("http://localhost:5000/api/goals/deleteGoal", {
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
      <div className='edit-goal'>
        <h1>Edit Goal</h1>
        <div className='goal-details'>
          <div className='detail'>
            <span className='label' htmlFor='goal_name'>
              Goal Name:
            </span>
            <span className='value category'>{Goal.category}</span>
          </div>
          <div className='detail'>
            <span className='label' htmlFor='target_amount'>
              Target Amount:
            </span>
            <span className='value target-amount'>{Goal.target_amount}</span>
          </div>
          <div className='detail'>
            <span className='label' htmlFor='current_amount'>
              Current Amount:
            </span>
            <span className='value current-amount'>{Goal.current_amount}</span>
          </div>
          <div className='detail'>
            <span className='label'>Deadline:</span>
            <span className='value deadline'>{Goal.deadline}</span>
          </div>
          <div className='detail'>
            <span className='label'>Days Remaining:</span>
            <span className='value days-remaining'>{Goal.daysRemaining}</span>
          </div>
          <button onClick={() => deleteone(Goal._id)}>Confirm Delete</button>
          <button onClick={() => navigate("/")}>Back to Profile</button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default DeleteGoal;
