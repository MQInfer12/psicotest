import styled from "styled-components";
import { theme } from "./themes";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${theme.textPrincipal}
`;

export const DivInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: ${props => props.maxheight};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colorPrincipal};
  }
`;

export const DivSeparador = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DivText = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.padding};
`;

export const PText = styled.p`
  max-width: 300px;
  text-transform: uppercase;
  font-size: ${props => props.titulo ? "14px" : "12px"};
  color: ${theme.textPrincipal};
  font-weight: ${props => props.titulo ? "700" : "500"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > .bolder {
    font-weight: 600;
  }
  & > .lighter {
    font-weight: 400;
  }
`;

export const InputText = styled.input`
  text-align: ${props => props.center ? "center" : "start"};
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid ${theme.textSecondary};
  outline: none;
  color: ${theme.textPrincipal};
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${theme.principal};

  &:disabled {
    background-color: ${theme.backgroundPrincipal};
  }
`;

export const InputSelect = styled.select`
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid ${theme.textSecondary};
  outline: none;
  color: ${theme.textPrincipal};
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 6px;
  background-color: ${theme.principal};

  &:disabled {
    background-color: ${theme.backgroundPrincipal};
  }
`;

export const ErrorCss = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${theme.textError};
`;

export const PurpleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  width: ${props => props.width};
  border: 1px solid ${theme.textSecondary};
  padding: 8px 26px 8px 26px;
  background-color: ${theme.colorPrincipal};
  border-radius: 8px;
  color: ${theme.textSecondary};
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s;
  
  &:hover {
    filter: grayscale(0.2);
  }

  &:disabled {
    pointer-events: none;
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
    border: 1px solid ${theme.textPrincipal};
  }
`;

export const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  border: 1px solid ${theme.textSecondary};
  padding: 8px 26px 8px 26px;
  background-color: ${theme.principal};
  border-radius: 8px;
  color: ${theme.textPrincipal};
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  max-width: ${props => props.maxwidth};
  width: ${props => props.width};

  &:hover {
    color: ${theme.textSecondary};
    background-color: ${theme.colorPrincipal};
    border: 1px solid ${theme.colorPrincipal};
  }

  color: ${props => props.active && theme.textSecondary};
  background-color: ${props => props.active && theme.colorPrincipal};
  border: ${props => props.active && "1px solid " + theme.colorPrincipal};

  &:disabled {
    pointer-events: none;
    border: 1px solid ${theme.textPrincipal};
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
  }
`;

export const DangerButton = styled.button`
  min-height: 42px;
  border: 1px solid ${theme.textSecondary};
  padding: 8px 20px 8px 20px;
  background-color: ${theme.principal};
  border-radius: 8px;
  color: ${theme.textRed};
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${theme.principal};
    background-color: ${theme.textRed};
    border: 1px solid ${theme.textRed};
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${theme.textPrincipal};
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
  }
`;

export const PurpleIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: none;
  background-color: ${theme.colorPrincipal};
  border-radius: 10px;
  color: ${theme.textSecondary};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0.2);
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${theme.textPrincipal};
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
  }
`;

export const WhiteIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: 1px solid ${theme.textSecondary};
  background-color: ${theme.principal};
  border-radius: 10px;
  color: ${theme.textPrincipal};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: ${props => props.minwidth};

  &:hover {
    color: ${theme.textSecondary};
    background-color: ${theme.colorPrincipal};
    border: 1px solid ${theme.colorPrincipal};
  }

  color: ${props => props.active && theme.textSecondary};
  background-color: ${props => props.active && theme.colorPrincipal};
  border: ${props => props.active && "1px solid " + theme.colorPrincipal};

  &:disabled {
    pointer-events: none;
    border: 1px solid ${theme.textPrincipal};
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
  }
`;

export const DangerIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 32px;
  width: 40px;
  border: 1px solid ${theme.textSecondary};
  background-color: ${theme.principal};
  border-radius: 10px;
  color: ${theme.textRed};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${theme.principal};
    background-color: ${theme.textRed};
    border: 1px solid ${theme.textRed};
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${theme.textPrincipal};
    background-color: ${theme.textPrincipal};
    color: ${theme.textSecondary};
  }
`;