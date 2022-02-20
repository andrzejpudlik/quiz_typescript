import { useState } from 'react';

import { fetchQuizQuestions, QuestionsState, Difficulty } from './api/Api';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './styles/App.styled';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [chooseDifficulty, setChooseDifficulty] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const startQuestions = async (choose: Difficulty) => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      choose
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setChooseDifficulty(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrapper>
        {!chooseDifficulty && (gameOver || userAnswers.length === TOTAL_QUESTIONS) ? (
          <button className='start' onClick={() => setChooseDifficulty(true)}>
            Start
          </button>
        ) : null}
        {chooseDifficulty && (gameOver || userAnswers.length === TOTAL_QUESTIONS) ? (
          <>
            <p>Choose the difficulty level</p>
            <button className='choose' onClick={() => startQuestions(Difficulty.EASY)}>
              EASY
            </button>
            <button className='choose' onClick={() => startQuestions(Difficulty.MEDIUM)}>
              MEDIUM
            </button>
            <button className='choose' onClick={() => startQuestions(Difficulty.HARD)}>
              HARD
            </button>
          </>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;