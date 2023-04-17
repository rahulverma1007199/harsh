import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { LOGINURL } from "../../api/constants";
import axios from 'axios'
import { Button } from "@mui/material";
import "./loginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isErrorInAPI, setIsErrorInAPI] = useState(false);
  const onSubmitFun = (e) => {
    e.preventDefault();
    axios({
      url: LOGINURL,
      method: 'post',
      headers: '',
      data: {
        email, password
      }
    })
      .then(res => {
        localStorage.setItem("token", res.data.Token);
        if (email === res.data.data.email) {
          navigate(PATHS.dashboard, { replace: true });
        }
      }).catch(err => {
        setIsErrorInAPI(true);
      });
  }
  const [focusedEmail,setFocusedEmail] = useState(false);
  const [focusedPassword,setFocusedPassword] = useState(false);
  const handleFocusEmail = (e)=>{
    setFocusedEmail(true);
  }
  const handleFocusPassword = (e)=>{
    setFocusedPassword(true);
  }
  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 hidden md:block bg-cover bg-center"></div>
      <div className="w-full md:w-1/2 h-screen flex justify-center items-center">
        <form
          className="flex flex-col gap-5 w-full mx-44"
        >
          <h1 className="text-center text-2xl text-primaryBlue">
            Admin
          </h1>
          <div className="flex flex-col gap-5">
            Email
            <input
              label="Email"
              className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full "
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              onBlur={handleFocusEmail}
              focusedemail = {focusedEmail.toString()}
            />
            <span className="emailError">It should be a valid email address!</span>
            Password
            <input
              label="Password"
              className="border border-primaryBlack px-3 py-2 focus:border-primaryBlue outline-none w-full "
              type="password"
              placeholder="Password"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
              required
              onChange={e => setPassword(e.target.value)}
              onBlur={handleFocusPassword}
              focusedpassword = {focusedPassword.toString()}
            />
            <span className="passwordError">Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>

            <button type="submit" className="button" onClick={onSubmitFun}>Login</button>
            {isErrorInAPI && <>
              <p className="errorAPI" style={{display:"block"}}>Email or Password is not corrected.</p>
            </>}
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
