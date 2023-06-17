import styled from "styled-components";

export const AnswerPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100%;
  align-items: center;
`;

export const DataContainer = styled.div`
  background-color: ${props => props.theme.principal};
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
  color: ${props => props.theme.textDark};
`;

export const DataValue = styled.p`
  color: ${props => props.theme.textPrincipal};
  font-weight: 300;
  font-size: 14px;
  white-space: nowrap;
`;

export const InterpretationMessage = styled.p`
  color: ${props => props.theme.textPrincipal};
  font-weight: 300;
  font-size: 14px;
  width: 350px;
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
  color: ${props => props.theme.textDark};
  width: 100%;
  text-align: ${props => props.center ? "center" : "start"};
`;

export const RadioCheck = styled.input`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    border-radius: ${props => props.multimarcado ? "2px" : "50%"};
    background-color: ${props => props.theme.borders};
  }

  &:checked {
    &::after {
      background-color: ${props => props.theme.colorPrincipalLighter};
      border: 1px solid ${props => props.theme.principal};
    }
  }
`;
