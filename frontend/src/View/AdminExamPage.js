import React, { useState } from 'react';
import '../styles/AdminExamPage.css';

function AdminExamPage() {
  const [semester, setSemester] = useState('first');
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleExamDateChange = (e) => {
    setExamDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the exam details (semester, subject, date, start time, end time)
    console.log('Exam details submitted:', { semester, subject, examDate, startTime, endTime });
    // You can send this data to the server or perform other actions as needed.
  };

  return (
    <div className="admin-exam-page">
      <h1>Admin Exam Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Semester:
          <select value={semester} onChange={handleSemesterChange} required>
            <option value="first">First Semester</option>
            <option value="second">Second Semester</option>
          </select>
        </label>

        <label>
          Select Subject:
          <input type="text" value={subject} onChange={handleSubjectChange} required />
        </label>

        <label>
          Exam Date:
          <input type="date" value={examDate} onChange={handleExamDateChange} required />
        </label>

        <label>
          Start Time:
          <input type="time" value={startTime} onChange={handleStartTimeChange} required />
        </label>

        <label>
          End Time:
          <input type="time" value={endTime} onChange={handleEndTimeChange} required />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminExamPage;
