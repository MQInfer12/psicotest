import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${props => props.theme.textPrincipal};
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
    background: ${props => props.theme.textPrincipal};
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorPrincipal};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colorPrincipal};
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
  color: ${props => props.theme.textPrincipal};
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
  border: 1px solid ${props => props.theme.borders};
  outline: none;
  color: ${props => props.theme.textPrincipal};
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => props.theme.principal};

  &:disabled {
    background-color: ${props => props.theme.backgroundPrincipal};
  }
`;

export const InputSelect = styled.select`
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.borders};
  outline: none;
  color: ${props => props.theme.textPrincipal};
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 6px;
  background-color: ${props => props.theme.principal};

  &:disabled {
    background-color: ${props => props.theme.backgroundPrincipal};
  }
`;

export const ErrorCss = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${props => props.theme.textError};
`;

export const PurpleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  width: ${props => props.width};
  border: 1px solid ${props => props.theme.colorPrincipal};
  padding: 8px 26px 8px 26px;
  background-color: ${props => props.theme.colorPrincipal};
  border-radius: 8px;
  color: ${props => props.theme.textSecondary};
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
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
    border: 1px solid ${props => props.theme.textPrincipal};
  }
`;

export const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  border: 1px solid ${props => props.theme.borders};
  padding: 8px 26px 8px 26px;
  background-color: ${props => props.theme.principal};
  border-radius: 8px;
  color: ${props => props.theme.textPrincipal};
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  max-width: ${props => props.maxwidth};
  width: ${props => props.width};

  &:hover {
    color: ${props => props.theme.textSecondary};
    background-color: ${props => props.theme.colorPrincipal};
    border: 1px solid ${props => props.theme.colorPrincipal};
  }

  color: ${props => props.active && props.theme.textSecondary};
  background-color: ${props => props.active && props.theme.colorPrincipal};
  border: ${props => props.active && "1px solid " + props.theme.colorPrincipal};

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
  }
`;

export const DangerButton = styled.button`
  min-height: 42px;
  border: 1px solid ${props => props.theme.borders};
  padding: 8px 20px 8px 20px;
  background-color: ${props => props.theme.principal};
  border-radius: 8px;
  color: ${props => props.theme.textRed};
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.principal};
    background-color: ${props => props.theme.textRed};
    border: 1px solid ${props => props.theme.textRed};
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
  }
`;

export const PurpleIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: none;
  background-color: ${props => props.theme.colorPrincipal};
  border-radius: 10px;
  color: ${props => props.theme.textSecondary};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0.2);
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
  }
`;

export const WhiteIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: 1px solid ${props => props.theme.borders};
  background-color: ${props => props.theme.principal};
  border-radius: 10px;
  color: ${props => props.theme.textPrincipal};
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: ${props => props.minwidth};

  &:hover {
    color: ${props => props.theme.textSecondary};
    background-color: ${props => props.theme.colorPrincipal};
    border: 1px solid ${props => props.theme.colorPrincipal};
  }

  color: ${props => props.active && props.theme.textSecondary};
  background-color: ${props => props.active && props.theme.colorPrincipal};
  border: ${props => props.active && "1px solid " + props.theme.colorPrincipal};

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
  }
`;

export const DangerIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 32px;
  width: 40px;
  border: 1px solid ${props => props.theme.borders};
  background-color: ${props => props.theme.principal};
  border-radius: 10px;
  color: ${props => props.theme.textRed};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  animation: ${props => props.blink && "blink 4s linear infinite"};

  &:hover {
    color: ${props => props.theme.principal};
    background-color: ${props => props.theme.textRed};
    border: 1px solid ${props => props.theme.textRed};
    animation: none;
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
    animation: none;
  }

  @keyframes blink {
    60% {
      background-color: ${props => props.theme.principal};
      color: ${props => props.theme.textRed};
    }
    70% {
      background-color: ${props => props.theme.textRed};
      color: ${props => props.theme.principal};
    }
    80% {
      background-color: ${props => props.theme.principal};
      color: ${props => props.theme.textRed};
    }
    90% {
      background-color: ${props => props.theme.textRed};
      color: ${props => props.theme.principal};
    }
    100% {
      background-color: ${props => props.theme.principal};
      color: ${props => props.theme.textRed};
    }
  }
`;

export const MiniWhiteIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  border: 1px solid ${props => props.theme.borders};
  background-color: ${props => props.theme.principal};
  border-radius: 10px;
  color: ${props => props.theme.textPrincipal};
  text-align: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: ${props => props.minwidth};

  &:hover {
    color: ${props => props.theme.textSecondary};
    background-color: ${props => props.theme.colorPrincipal};
    border: 1px solid ${props => props.theme.colorPrincipal};
  }

  color: ${props => props.active && props.theme.textSecondary};
  background-color: ${props => props.active && props.theme.colorPrincipal};
  border: ${props => props.active && "1px solid " + props.theme.colorPrincipal};

  &:disabled {
    pointer-events: none;
    border: 1px solid ${props => props.theme.textPrincipal};
    background-color: ${props => props.theme.textPrincipal};
    color: ${props => props.theme.textSecondary};
  }
`;