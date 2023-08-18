import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./goallist.css";
import { Outlet, useNavigate } from "react-router-dom";

function GoalList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const [goal, setGoal] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post("http://localhost:5000/api/goals/FindGoal", { userid: userid })
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
  }, [userid]);

  return (
    <div className='goallist'>
      <h1>goallist</h1>
      {goal === "nodata" ? (
        <p>No goal Found</p>
      ) : goal.length > 0 ? (
        goal.map((g) => (
          <div className='goal' key={g._id}>
            <h2 className='goal_name'>{g.goal_name}</h2>
            <p className='target_amount'>
              <span>target_amount:</span>
              {g.target_amount}
            </p>
            <p className='current_amount'>
              <span>current amount:</span>
              {g.current_amount}
            </p>
            <p className='deadline'>
              <span>Deadline:</span>
              {g.deadline}
            </p>
            <p className='daysRemaining'>
              <span>Days Remaining:</span>
              {g.daysRemaining}
            </p>
            <button
              className='delbutton'
              value='delete'
              onClick={() => navigate(`/deletegoal/${g._id}`)}
            >
              delete
            </button>
            <button
              className='editbutton'
              onClick={() => navigate(`/editgoal/${g._id}`)}
            >
              Edit
            </button>
          </div>
        ))
      ) : (
        <p>No goal data available.</p>
      )}
      <Outlet />
    </div>
  );
}
export default GoalList;
