import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #000;
    margin: 0;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #fff;
    font-size: 1.3rem;
  }
  .score {
    color: #fff;
    font-size: 2rem;
  }
  .start, .choose, .next {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(39, 143, 255) 0%,
      rgb(12, 99, 250) 100%
    );
    outline: none;
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 1rem;
    height: 40px;
    margin: 20px 0;
    width: 200px;
  }
`;