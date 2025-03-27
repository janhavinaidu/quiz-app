import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

export const Quiz = () => {
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  let [shuffledData, setShuffledData] = useState(shuffleArray(data)); // Store shuffled questions
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(shuffledData[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const checkans = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        const correctOption = [Option1, Option2, Option3, Option4][question.ans - 1].current;
        correctOption.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === shuffledData.length - 1) {
        setResult(true);
        return;
      }

      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(shuffledData[index + 1]);
      setLock(false);

      [Option1, Option2, Option3, Option4].forEach((option) => {
        option.current.classList.remove('wrong', 'correct');
      });
    }
  };

  const reset = () => {
    const newShuffledData = shuffleArray(data); // Generate a new shuffled set
    setShuffledData(newShuffledData);
    setIndex(0);
    setQuestion(newShuffledData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You Scored {score} out of {shuffledData.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkans(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkans(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkans(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkans(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className='index'>{index + 1} of {shuffledData.length} questions</div>
        </>
      )}
    </div>
  );
};
