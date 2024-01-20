import React, { useState } from 'react';
import '../styles/ExamScheduling.css';

function ExamScheduling() {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedExam, setSelectedExam] = useState('');
  const [examTime, setExamTime] = useState('');
  const [examPlace, setExamPlace] = useState('');
  const [examDuration, setExamDuration] = useState('');
  const [examType, setExamType] = useState('');
  const [examNotes, setExamNotes] = useState('');

  const students = [
    { id: 1, name: 'Student 1' },
    { id: 2, name: 'Student 2' },
    { id: 3, name: 'Student 3' },
    // Add more students as needed
  ];

  const exams = ['Math Exam', 'Science Exam', 'English Exam', 'History Exam'];

  const handleStudentChange = (e) => {
    const studentId = parseInt(e.target.value);
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleExamTimeChange = (e) => {
    setExamTime(e.target.value);
  };

  const handleExamPlaceChange = (e) => {
    setExamPlace(e.target.value);
  };

  const handleExamDurationChange = (e) => {
    setExamDuration(e.target.value);
  };

  const handleExamTypeChange = (e) => {
    setExamType(e.target.value);
  };

  const handleExamNotesChange = (e) => {
    setExamNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the exam scheduling details
    console.log('Exam scheduling details submitted:', {
      selectedStudents,
      selectedExam,
      examTime,
      examPlace,
      examDuration,
      examType,
      examNotes,
    });
    // You can send this data to the server or perform other actions as needed.
  };

  return (
    <div className="exam-scheduling">
      <h1>Exam Scheduling</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Students:
          <select multiple value={selectedStudents} onChange={handleStudentChange} required>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Exam:
          <select value={selectedExam} onChange={handleExamChange} required>
            <option value="">Select</option>
            {exams.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </label>

        <label>
          Exam Time:
          <input type="datetime-local" value={examTime} onChange={handleExamTimeChange} required />
        </label>

        <label>
          Exam Place:
          <input type="text" value={examPlace} onChange={handleExamPlaceChange} required />
        </label>

        <label>
          Exam Duration (in minutes):
          <input type="number" value={examDuration} onChange={handleExamDurationChange} required />
        </label>

        <label>
          Exam Type:
          <input type="text" value={examType} onChange={handleExamTypeChange} required />
        </label>

        <label>
          Exam Notes:
          <textarea value={examNotes} onChange={handleExamNotesChange} />
        </label>

        <button type="submit">Schedule Exam</button>
      </form>
    </div>
  );
}

export default ExamScheduling;
