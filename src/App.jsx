import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import QuizGenerator from "./pages/QuizGenerator";

export default function App() {
  return (
    (
      <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/makequiz" element={<QuizGenerator/>} />
        </Routes>
      </BrowserRouter>
      </div>
    )
  );
}
