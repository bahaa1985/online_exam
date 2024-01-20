import React, { useState } from 'react';
import '../styles/QuestionBank.css';

function QuestionBank() {
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the question details (type, text, options)
    console.log('Question details submitted:', { questionType, questionText, options });
    // You can send this data to the server or perform other actions as needed.
  };

  return (
    <div className="question-bank">
      <h1>Question Bank</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Question Type:
          <select value={questionType} onChange={handleQuestionTypeChange} required>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
            {/* Add more question types as needed */}
          </select>
        </label>

        <label>
          Enter Question:
          <textarea value={questionText} onChange={handleQuestionTextChange} required />
        </label>

        <label>
          Enter Options:
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionBank;
