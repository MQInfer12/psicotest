import styled from "styled-components";

export const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
  align-items: center;
`;

export const DataContainer = styled.div`
  background-color: #ffffff;
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
  color: #3e435d;
`;

export const DataValue = styled.p`
  color: #ada7a7;
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
  color: #3e435d;
  width: 100%;
  text-align: start;
`;

