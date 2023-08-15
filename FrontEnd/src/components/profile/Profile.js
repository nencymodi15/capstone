import React from "react";
import "./Profile.css";
import BudgetList from "../budgetlist/BudgetList";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Profile({ setLoginUser, user }) {
  const navigate = useNavigate();

  return (
    <div className='profile'>
      <h1>{user.firstName}</h1>
      <BudgetList data={user._id} />
      <Link to={`/addbudget/${user._id}`}>Go to add budget</Link>
      <div className='button' onClick={() => setLoginUser({})}>
        Log Out
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
