import React, { useState } from 'react';
import '../styles/ExamResults.css';

function ExamResults() {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Math Exam',
      date: '2023-12-15',
      totalScore: 90,
      detailedScores: [
        { question: 'Question 1', score: 20 },
        { question: 'Question 2', score: 25 },
        { question: 'Question 3', score: 22 },
        // Add more questions as needed
      ],
      relativeRanking: 5,
      targetGrade: 'A',
      feedback: 'Great job! Keep up the good work.',
    },
    // Add more exams as needed
  ]);

  const [filter, setFilter] = useState({
    date: '',
    subject: '',
    // Add more filters as needed
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredExams = exams.filter((exam) => {
    const dateMatch = exam.date.includes(filter.date);
    const subjectMatch = exam.name.toLowerCase().includes(filter.subject.toLowerCase());
    // Add more filter conditions as needed
    return dateMatch && subjectMatch;
  });

  return (
    <div className="exam-results">
      <h1>Exam Results</h1>
      <div className="filters">
        <label>
          Filter by Date:
          <input type="text" name="date" value={filter.date} onChange={handleFilterChange} />
        </label>
        <label>
          Filter by Subject:
          <input type="text" name="subject" value={filter.subject} onChange={handleFilterChange} />
        </label>
        {/* Add more filter options as needed */}
      </div>
      {filteredExams.map((exam) => (
        <div key={exam.id} className="exam">
          <h2>{exam.name}</h2>
          <p>Date: {exam.date}</p>
          <p>Total Score: {exam.totalScore}</p>
          <div className="detailed-scores">
            <h3>Detailed Scores</h3>
            {exam.detailedScores.map((score, index) => (
              <p key={index}>
                {score.question}: {score.score}
              </p>
            ))}
          </div>
          <p>Relative Ranking: {exam.relativeRanking}</p>
          <p>Target Grade: {exam.targetGrade}</p>
          <p>Feedback: {exam.feedback}</p>
          <button onClick={() => handleDownloadPrint(exam)}>Download/Print</button>
          <button onClick={() => handleCommunicateOfficials(exam)}>Communicate with Officials</button>
        </div>
      ))}
    </div>
  );
}

const handleDownloadPrint = (exam) => {
  // Implement download/print functionality
  console.log(`Downloading/Printing exam results for ${exam.name}`);
};

const handleCommunicateOfficials = (exam) => {
  // Implement communication with officials functionality
  console.log(`Communicating with officials about exam results for ${exam.name}`);
};

export default ExamResults;
