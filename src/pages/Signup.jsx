import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signupcall() {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  }

  return (
    <div className='bg-blue-300 flex justify-center h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white text-center pl-5 pr-5 pb-5 pt-3'>
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={e => setUsername(e.target.value)} label={"Username"} placeholder={"Doe"} />
          <InputBox onChange={e => setEmail(e.target.value)} label={"Email"} placeholder={"aditya@gmail.com"} />
          <InputBox onChange={e => setPassword(e.target.value)} label={"Password"} placeholder={"123456"} />
          <Button onClick={signupcall} label={"Sign Up"} />
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
