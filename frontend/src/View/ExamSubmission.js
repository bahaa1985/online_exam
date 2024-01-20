import React, { useState, useEffect } from 'react';
import '../styles/ExamSubmission.css';

function ExamSubmission() {
  const [questions, setQuestions] = useState([
    'Question 1: What is the capital of France?',
    'Question 2: Solve for x: 2x + 5 = 15',
    'Question 3: Who wrote the play "Romeo and Juliet"?',
    // Add more questions as needed
  ]);
  const [studentAnswers, setStudentAnswers] = useState(Array(questions.length).fill(''));
  const [timer, setTimer] = useState(60 * 30); // 30 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isTimerRunning && timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsTimerRunning(false);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  const handleAnswerChange = (index, answer) => {
    setStudentAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const handleSaveTemporary = () => {
    // Implement save temporary functionality if needed
    console.log('Answers saved temporarily:', studentAnswers);
  };

  const handleSubmitExam = () => {
    // Implement submit exam functionality
    // Calculate total score, track progress, etc.
    console.log('Exam submitted:', studentAnswers);
    // You can send this data to the server or perform other actions as needed.
    setShowCorrectAnswers(true); // For demonstration purposes, show correct answers after submission
  };

  return (
    <div className="exam-submission">
      <h1>Exam Submission</h1>
      <div className="timer">Time Remaining: {formatTime(timer)}</div>
      <div className="questions">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            <textarea
              value={studentAnswers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleSaveTemporary}>Save Temporary</button>
        <button onClick={handleSubmitExam}>Submit Exam</button>
      </div>
      {showCorrectAnswers && (
        <div className="correct-answers">
          <h2>Correct Answers</h2>
          {questions.map((question, index) => (
            <p key={index}>
              {question} - Correct Answer: [Correct Answer Goes Here]
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamSubmission;
