import styled from "styled-components";
import { theme } from "../globals/themes";

export const DivAlerta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 10px;
`;

export const DivAlertaText = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-around;
`;

export const DivIcon = styled.i`
  font-size: 100px;
  color: ${theme.colorPrincipal};
`;

export const H2Title = styled.h2`
  font-size: 1.2rem;
  color: ${theme.textDark};
`;

export const PText = styled.p`
  font-size: 1rem;
  color: ${theme.textPrincipal};
`;

export const DivButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;