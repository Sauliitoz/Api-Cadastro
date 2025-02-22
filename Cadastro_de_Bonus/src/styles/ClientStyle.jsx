import styled from "styled-components";

export const ClienteContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

export const ClienteTitulo = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

export const ClienteInfo = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
  strong {
    color: #222;
  }
`;
