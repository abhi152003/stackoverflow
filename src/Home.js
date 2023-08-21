import React, { useState, useEffect } from 'react';
import './Home.css';
import { database } from './firebase'; // Import the database instance
import { ref, onValue, push } from 'firebase/database'; // Import the needed functions
import useAuth from './useAuth';

function Home() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [userQuestions, setUserQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}/questions`);
      onValue(userRef, (snapshot) => {
        const questionsData = [];
        snapshot.forEach((childSnapshot) => {
          questionsData.push(childSnapshot.val());
        });
        setUserQuestions(questionsData);
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      const questionData = {
        userId: user.uid,
        userEmail: user.email,
        questionText: question,
        timestamp: new Date().toISOString(),
      };

      const userRef = ref(database, `users/${user.uid}/questions`);
      push(userRef, questionData);

      setQuestion('');
    } else {
      console.log('User not authenticated');
    }
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
    <div className='home'>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder='Write your question here...'
          rows={4}
        />
        <button type='submit'>Submit</button>
      </form>

      <h2>User-Submitted Questions</h2>
      <ul>
        {userQuestions.map((questionData, index) => (
          <li
            key={index}
            onClick={() => handleQuestionClick(index)}
            style={{ cursor: 'pointer' }}
          >
            <strong>Email:</strong> {questionData.userEmail}<br />
            <strong>Question:</strong> {selectedQuestionIndex === index
              ? questionData.questionText
              : questionData.questionText.slice(0, 30) + '...'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
