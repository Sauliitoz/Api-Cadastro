import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }


  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
      background-color: #0056b3;
    }
  }
    h3{
    text-align: center;
    margin-bottom: 10px;
    }
    span{
    font-weight: bold;
    }
`;

export default GlobalStyles;
