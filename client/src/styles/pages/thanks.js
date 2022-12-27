import styled from "styled-components";

export const DivEntero = styled.div`
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
`;

export const PurpleIcon = styled.i`
  font-size: 100px;
  color: #660BE1;
  animation: appear 2s ease;

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;