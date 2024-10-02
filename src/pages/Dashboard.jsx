import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuizDashboard from '@/QuizDashboard';
const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from backend
    const fetchQuizzes = async () => {

        axios.get("http://localhost:3000/api/quizzes", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(response => {setQuizzes(response.data)
          console.log(response.data)
        })
          .catch(error => console.error('Error fetching quizzes:', error));
    };

    fetchQuizzes();
  }, []);

  return (

    <div>
    <QuizDashboard quizzes={quizzes}/>
    </div>
  )
}

export default Dashboard
