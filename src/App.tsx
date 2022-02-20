import { useState } from 'react';

import { fetchQuizQuestions, QuestionsState, Difficulty } from './api/Api';
import Header from './components/Header';
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
      </Wrapper>
    </>
  );
}

export default App;