import React from "react";
import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import BudgetAdd from "./components/budgetadd/BudgetAdd";
import EditBudget from "./components/editbudget/Editbudget";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            path='/editbudget/:id'
            element={<EditBudget setLoginUser={setLoginUser} />}
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
