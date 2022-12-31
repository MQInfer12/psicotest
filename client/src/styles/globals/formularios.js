import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DivInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DivText = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PText = styled.p`
  text-transform: uppercase;
  font-size: 12px;
  color: #ADA7A7;
  font-weight: 500;
`;

export const InputText = styled.input`
  text-align: ${props => props.center ? "center" : "start"};
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  outline: none;
  color: #636161;
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const InputSelect = styled.select`
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  outline: none;
  color: #636161;
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 6px;
`;

export const ErrorCss = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: #dc3545;
`;

export const PurpleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  width: ${props => props.width};
  border: 1px solid #660BE1;
  padding: 8px 26px 8px 26px;
  background-color: #660BE1;
  border-radius: 8px;
  color: #D9D9D9;
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
    background-color: #ADA7A7;
    color: #D9D9D9;
    border: 1px solid #ADA7A7;
  }
`;

export const WhiteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 42px;
  border: 1px solid #D9D9D9;
  padding: 8px 26px 8px 26px;
  background-color: #FFFFFF;
  border-radius: 8px;
  color: #ADA7A7;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #D9D9D9;
    background-color: #660be1;
    border: 1px solid #660be1;
  }

  color: ${props => props.active && "#D9D9D9"};
  background-color: ${props => props.active && "#660be1"};
  border: ${props => props.active && "1px solid #660be1"};

  &:disabled {
    pointer-events: none;
    border: 1px solid #ADA7A7;
    background-color: #ADA7A7;
    color: #D9D9D9;
  }
`;

export const DangerButton = styled.button`
  min-height: 42px;
  border: 1px solid #D9D9D9;
  padding: 8px 20px 8px 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  color: #DC4067;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #FFFFFF;
    background-color: #DC4067;
    border: 1px solid #DC4067;
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid #ADA7A7;
    background-color: #ADA7A7;
    color: #D9D9D9;
  }
`;

export const PurpleIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: none;
  background-color: #660BE1;
  border-radius: 10px;
  color: #D9D9D9;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0.2);
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid #ADA7A7;
    background-color: #ADA7A7;
    color: #D9D9D9;
  }
`;

export const WhiteIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  border: 1px solid #D9D9D9;
  background-color: #FFFFFF;
  border-radius: 10px;
  color: #ADA7A7;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #D9D9D9;
    background-color: #660be1;
    border: 1px solid #660be1;
  }

  color: ${props => props.active && "#D9D9D9"};
  background-color: ${props => props.active && "#660be1"};
  border: ${props => props.active && "1px solid #660be1"};

  &:disabled {
    pointer-events: none;
    border: 1px solid #ADA7A7;
    background-color: #ADA7A7;
    color: #D9D9D9;
  }
`;

export const DangerIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  height: 32px;
  width: 40px;
  border: 1px solid #D9D9D9;
  background-color: #FFFFFF;
  border-radius: 10px;
  color: #DC4067;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #FFFFFF;
    background-color: #DC4067;
    border: 1px solid #DC4067;
  }

  &:disabled {
    pointer-events: none;
    border: 1px solid #ADA7A7;
    background-color: #ADA7A7;
    color: #D9D9D9;
  }
`;