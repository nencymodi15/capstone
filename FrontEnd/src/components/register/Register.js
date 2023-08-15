import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Outlet, useNavigate } from "react-router-dom";

function Register() {
  const Navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    phoneno: "",
    password: "",
    Re_enterpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = () => {
    const {
      firstname,
      lastname,
      emailid,
      phoneno,
      password,
      Re_enterpassword,
    } = user;
    if (firstname && lastname && emailid && password === Re_enterpassword) {
      console.log("coming here");
      axios
        .post("http://localhost:5000/api/users/register", user)
        .then((res) => {
          console.log(res.data.message);
          alert(res.data.message);
        });
      Navigate("/login");
    } else {
      alert("invalidPost");
    }
  };
  return (
    <div className='register'>
      <h1>Register</h1>
      <label for='firstname'>FirstName:</label>
      <input
        type='text'
        name='firstname'
        value={user.firstname}
        id='firstname'
        onChange={handleChange}
      />
      <label for='lastname'>lastName:</label>
      <input
        type='text'
        name='lastname'
        value={user.lastname}
        id='lastname'
        onChange={handleChange}
      />
      <label for='emailid'>Email-Id:</label>
      <input
        type='text'
        name='emailid'
        value={user.emailid}
        id='emailid'
        onChange={handleChange}
      />
      <label for='phoneno'>Phone No:</label>
      <input
        type='text'
        name='phoneno'
        value={user.phoneno}
        id='phoneno'
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
      <label for='Re_enterpassword'>Re-Password:</label>
      <input
        type='password'
        name='Re_enterpassword'
        value={user.Re_enterpassword}
        id='Re_enterpassword'
        onChange={handleChange}
      />
      <input type='button' value={"register"} onClick={register}></input>
      <label>If you have Account then login</label>
      <input
        type='button'
        value={"Login"}
        onClick={() => Navigate("/login")}
      ></input>
      <Outlet />
    </div>
  );
}

export default Register;
