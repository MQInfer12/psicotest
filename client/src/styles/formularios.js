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

export const PText = styled.p`
  text-transform: uppercase;
  font-size: 12px;
  color: #ADA7A7;
  font-weight: 500;
`;

export const InputText = styled.input`
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #D9D9D9;
  outline: none;
  color: #636161;
  min-width: 300px;
  width: 100%;
  height: 38px;
  padding-left: 10px;
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
  height: 42px;
  border: none;
  padding: 8px 26px 8px 26px;
  background-color: #660BE1;
  border-radius: 8px;
  color: #D9D9D9;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  text-transform: capitalize;
`;

export const WhiteButton = styled.button`
  height: 42px;
  border: 1px solid #D9D9D9;
  padding: 8px 20px 8px 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  color: #ADA7A7;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;