import React from 'react';
import './App.css';
import {useNavigate } from 'react-router-dom';
// Simple Button component
const Button = ({ children, variant = 'primary', onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: variant === 'primary' ? 'rgb(71 79 91 / 50%)' : 'transparent',
      color: variant === 'primary' ? 'rgb(226 226 226)' : '#ffffff',
      border: variant === 'primary' ? 'none' : '2px solid #ffffff',
      boxShadow: variant === 'primary' ? 'rgb(51 51 55) 0px 2px 6px' : 'none',
    }}
  >
    {children}
  </button>
);

// Simple Card component
const Card = ({ title, children }) => (
  <div style={{
    backgroundColor: 'rgb(38,38,49)',
    border: '1px solid #333333',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '6px',
      backgroundColor: "#ffffff",
    }} />
    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '16px', color: '#ffffff' }}>{title}</h3>
    {children}
  </div>
);

// Icon components
const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: 'rgb(226 226 226)' }}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#ffffff' }}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export default function QuizDashboard({quizzes}) {
  const navigate = useNavigate();
  const handleCreateQuiz = () => {
    // Implement the logic to create a new quiz
    navigate('/makequiz')
    console.log("Create new quiz");
  };

  const handleTakeQuiz = (quizId) => {
    // Implement the logic to start a quiz
    console.log(`Take quiz with id: ${quizId}`);
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh',
      
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center',
        color: '#ffffff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
      }}>
        Quiz Master Dashboard
      </h1>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        flexWrap: 'wrap',
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: '#d0d0d0',
        }}>Your Quizzes</h2>
        <Button onClick={handleCreateQuiz}>
          <PlusCircleIcon /> Create New Quiz
        </Button>
      </header>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
      }}>
        {quizzes.map((quiz) => (
          <Card key={quiz._id} title={quiz.title}>
            <p style={{ color: '#cccccc', marginBottom: '20px', fontSize: '1.1rem' }}>{quiz.description} Description</p>
            <Button variant="outline" onClick={() => handleTakeQuiz(quiz._id)}>
              <BookOpenIcon /> Take Quiz
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
