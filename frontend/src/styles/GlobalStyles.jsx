import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background-color:hsla(0, 0.00%, 45.50%, 0.40);
  }

  h3 {
    text-align: center;
    margin-bottom: 10px;
    color:#000
  }

  button {
    padding: 10px;
    font-size: 16px;
    background-color:#0400ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
      background-color:#148bdb;
    }
  }

  span {
    font-weight: bold;
  }
`;

export default GlobalStyles;
