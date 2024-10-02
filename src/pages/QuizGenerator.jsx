import React, { useState } from 'react';
import axios from 'axios';
import './QuizGenerator.css'; // Import the CSS file

const QuizGenerator = () => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(3);
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleGenerateQuiz = async () => {
        setLoading(true);
        setError(null);
        setSubmitted(false); // Reset submitted state for new quiz
        try {
            const token = localStorage.getItem('token'); // Or however you're storing the token
            const response = await axios.post('http://localhost:3000/generate-story', {
                prompt: topic,
                numQuestions: numQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Extract the questions array from the response
            setQuizData(response.data.data.questions);
            console.log(response.data);
        }  catch (error) {
            setError('Error generating quiz data');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer
        }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div className="quiz-generator">
            <h1>Quiz Generator</h1>
            <div>
                <label>
                    Topic:
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter topic"
                    />
                </label>
            </div>
            <div>
                <label>
                    Number of Questions:
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(Number(e.target.value))}
                        min="1"
                    />
                </label>
            </div>
            <button onClick={handleGenerateQuiz} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Quiz'}
            </button>
            {error && <p className="error">{error}</p>}
            {quizData.length > 0 && (
                <div className="quiz-display">
                    {quizData.map((question, index) => (
                        <div key={index} className="quiz-question">
                            <h3>{question.text}</h3>
                            <ul>
                                {question.options.map((option, idx) => (
                                    <li key={idx}>
                                        <input
                                            type="radio"
                                            id={`q${index}o${idx}`}
                                            name={`q${index}`}
                                            value={option}
                                            checked={userAnswers[index] === option}
                                            onChange={() => handleAnswerChange(index, option)}
                                        />
                                        <label htmlFor={`q${index}o${idx}`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {!submitted ? (
                        <button onClick={handleSubmit}>Submit Answers</button>
                    ) : (
                        <div className="results">
                            {quizData.map((question, index) => (
                                <div key={index} className="result">
                                    <h3>{question.text}</h3>
                                    <p>
                                        Your answer: {userAnswers[index] || 'Not answered'}
                                    </p>
                                    <p>Correct answer: {question.correctAnswer}</p>
                                    {userAnswers[index] === question.correctAnswer ? (
                                        <p className="correct">Correct!</p>
                                    ) : (
                                        <p className="incorrect">Incorrect.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizGenerator;
