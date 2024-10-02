import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomWarning from '../components/BottomWarning';
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signincall() {
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } 
    } catch (error) {
      console.error("Signin failed", error);
    }
  }

  return (
    <div className="bg-blue-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={e => setEmail(e.target.value)} placeholder="aditya@gmail.com" label={"Email"} />
          <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} type="password" />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={signincall} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/"} />
        </div>
      </div>
    </div>
  );
}

export default Signin;
