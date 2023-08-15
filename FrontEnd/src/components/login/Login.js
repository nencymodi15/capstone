import { useState } from "react";
import React from "react";
import "./Login.css";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

function Login({ setLoginUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    emailid: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:5000/api/users/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      navigate("/");
    });
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <label for='emailid'>E-mail:</label>
      <input
        type='text'
        name='emailid'
        value={user.emailid}
        id='emailid'
        onChange={handleChange}
      />
      <label for='password'>Password:</label>
      <input
        type='password'
        name='password'
        value={user.password}
        id='password'
        onChange={handleChange}
      />
      <input type='button' value={"Login"} onClick={login}></input>
      <label>If dont you have Account then Register </label>
      <input
        type='button'
        value={"Register"}
        onClick={() => navigate("/register")}
      ></input>
      <Outlet />
    </div>
  );
}

export default Login;
