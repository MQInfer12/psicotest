import styled from "styled-components";
import { theme } from "../globals/themes";

export const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
  align-items: center;
`;

export const DataContainer = styled.div`
  background-color: ${theme.principal};
  padding: 24px 64px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 370px;
`;

export const DataKey = styled.strong`
  font-weight: 500;
  font-size: 16px;
  color: ${theme.textDark};
`;

export const DataValue = styled.p`
  color: ${theme.textPrincipal};
  font-weight: 300;
  font-size: 14px;
  white-space: nowrap;
`;

export const SeccionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

  //TABLA

export const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.textDark};
  width: 100%;
  text-align: start;
`;

