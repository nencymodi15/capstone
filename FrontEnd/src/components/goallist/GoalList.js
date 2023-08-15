import { useState, useEffect } from "react";
import React from "react";
import "./BudgeList.css";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function GoalList(props, { setLoginUser }) {
  const navigate = useNavigate();
  const [goal, setGoal] = useState([]);
  const userid = props.data;

  useEffect(() => {
    if (userid) {
      axios
        .post("http://localhost:5000/api/goal/findGoal", { userid: userid })
        .then((res) => {
          if (res.data.goal) {
            setGoal(res.data.goal);
          } else {
            setGoal("nodata");
          }
        });
    }
  }, []);

  async function deleteone(_id) {
    console.log("coming this way");
    axios
      .post("http://localhost:5000/api/goal/deleteGoal", { _id: _id })
      .then((res) => {
        axios("http://localhost:5000/api/users/finduser", goal.userid).then(
          (res) => {
            setLoginUser(res.data.user);
            navigate("/");
          }
        );
      });
  }

  return (
    <div>
      <h1>goallist</h1>
      {goal === "nodata" ? (
        <p>No goal Found</p>
      ) : goal.length > 0 ? (
        goal.map((b) => (
          <div className='goal' key={b._id}>
            <h2 className='goalcat'>{b.goalCategory}</h2>
            <p className='amount'>
              <span>amount to spend:</span>
              {b.amount}
            </p>
            <p className='remamount'>
              <span>remaining amount:</span>
              {b.amount}
            </p>
            <p className='samount'>
              <span>amount spend:</span>
              {b.amount}
            </p>
            <p className='enddate'>
              <span>Ending Date:</span>
              {b.enddate}
            </p>
            <p className='description'>
              <span>Motivation:</span>
              {b.description}
            </p>
            <p className='remdays'>
              <span>Remaining Days:</span>
              {b.amount}
            </p>
            <button
              className='delbutton'
              value='delete'
              onClick={() => deleteone(b._id)}
            >
              delete
            </button>
            <button
              className='editbutton'
              onClick={() => navigate(`/editgoal/${b._id}`)}
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
