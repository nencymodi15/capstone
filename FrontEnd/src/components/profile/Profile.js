import React from "react";
import "./Profile.css";
import BudgetList from "../budgetlist/BudgetList";
import SpendingList from "../spendlist/SpendList";
import IncomeList from "../income/IncomeList";
import { Outlet, Link, useNavigate } from "react-router-dom";
import GoalList from "../goallist/GoalList";

function Profile({ setLoginUser, user }) {
  const navigate = useNavigate();

  return (
    <div className='profile'>
      <h1>{user.firstName}</h1>
      <div className='modules-container'>
        <div className='module'>
          <h2>Budgets</h2>
          <Link to={`/addbudget/${user._id}`}>Go to add budget</Link>
          <BudgetList data={user._id} />
        </div>
        <div className='module'>
          <h2>Goals</h2>
          <Link to={`/addGoal/${user._id}`}>Go to add Goal</Link>
          <GoalList data={user._id} />
        </div>
        <div className='module'>
          <h2>Spendings</h2>
          <Link to={`/addSpending/${user._id}`}>Go to add Spending</Link>
          <SpendingList data={user._id} />
        </div>
        <div className='module'>
          <h2>Incomes</h2>
          <Link to={`/incomeadd/${user._id}`}>Go to add Income</Link>
          <IncomeList data={user._id} />
        </div>
      </div>
      <div className='button' onClick={() => setLoginUser({})}>
        Log Out
      </div>
      <Outlet />
    </div>
  );
}

export default Profile;
