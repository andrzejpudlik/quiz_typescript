import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  background: #000;
  border-radius: 10px;
  border: 5px solid #0911a3;
  color: #fff;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  p {
    font-size: 1rem;
  }
`;

type AnswerWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const AnswerWrapper = styled.div<AnswerWrapperProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct
        ? '#47D533'
        : !correct && userClicked
        ? '#E0122A'
        : '#1E3BF7'};
    border: none;
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;