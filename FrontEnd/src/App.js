import React from "react";
import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import BudgetAdd from "./components/budgetadd/BudgetAdd";
import GoalAdd from "./components/goaladd/AddGoal";
import EditBudget from "./components/editbudget/Editbudget";
import SpendingAdd from "./components/addspending/SpendingAdd";
import IncomeAdd from "./components/incomeadd/IncomeAdd";
import DeleteBudget from "./components/deletebudget/DeleteBudget";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditGoal from "./components/editgoal/EditGoal";
import DeleteSpending from "./components/deleteSpending/DeleteSpending";
import DeleteGoal from "./components/deleteGoal/DeleteGoal";
import EditIncome from "./components/editincome/EditIncome";
import DeleteIncome from "./deleteincome/DeleteIncome";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              user && user._id ? (
                <Profile setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/addbudget/:id'
            element={
              user && user._id ? (
                <BudgetAdd setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/deletebudget/:id'
            element={
              user && user._id ? (
                <DeleteBudget setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/deletespending/:id'
            element={
              user && user._id ? (
                <DeleteSpending setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/addSpending/:id'
            element={
              user && user._id ? (
                <SpendingAdd setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/deleteincome/:id'
            element={
              user && user._id ? (
                <DeleteIncome setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/editIncome/:id'
            element={
              user && user._id ? (
                <EditIncome setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/editbudget/:id'
            element={<EditBudget setLoginUser={setLoginUser} />}
          ></Route>
          <Route
            path='/addGoal/:id'
            element={
              user && user._id ? (
                <GoalAdd setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/editgoal/:id'
            element={<EditGoal setLoginUser={setLoginUser} />}
          ></Route>
          <Route
            path='/deletegoal/:id'
            element={<DeleteGoal setLoginUser={setLoginUser} />}
          ></Route>
          <Route
            path='/incomeadd/:id'
            element={
              user && user._id ? (
                <IncomeAdd setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path='/incomeadd/:id'
            element={
              user && user._id ? (
                <IncomeAdd setLoginUser={setLoginUser} user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route
            path='/login'
            element={<Login setLoginUser={setLoginUser} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
