import styled from "styled-components";

export const DivInput = styled.div`
  width: 100%;
  text-align: left;
`;

export const PText = styled.p`
  font-size: 1rem;
  color: #808291;
`;

export const InputText = styled.input`
  border: none;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid black;
`;

export const ButtonModal = styled.button`
  text-decoration: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1rem;
  background: linear-gradient(to right, #ff512f, #dd2476);
  box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 10%);
  color: #f8f9fa;

  &:hover {
    background: linear-gradient(to right, #8e2de2, #4a00e0);
  }
`;

export const ErrorCss = styled.p`
  margin-top: 10px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #dc3545;
`;