import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../styles/devices';
import { useNavigate } from 'react-router-dom';

const FourthSection = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  return (
    <Container>
      <PurpleDiv>
        <InfoContainer>
          <OpenYourAccount>Abre tu cuenta hoy</OpenYourAccount>
          <OpenP>Es rápido y sencillo, te tomará menos de 2 minutos</OpenP>
          <InputDiv>
            <Input 
              placeholder='Ingresa tu correo electrónico' 
              value={userEmail}  
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <DivButtonInput>
              <OpenAccountButton onClick={() => navigate('/register/' + userEmail)}>Abre tu cuenta</OpenAccountButton>
            </DivButtonInput>
          </InputDiv>
        </InfoContainer>
      </PurpleDiv>
    </Container>
  )
}

export default FourthSection

const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PurpleDiv = styled.div`
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 25px;
  width: 100%;
  max-width: 1000px;
  padding: 30px 20px;
  text-align: center;
`;

const InfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    transform: scale(0.8);
  }
`;

const OpenYourAccount = styled.h2`
  font-size: 60px;
  font-weight: 700;
  line-height: 138.4%;
  color: #FFFFFF;
`;

const OpenP = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
`;

const InputDiv = styled.div`
  display: flex;
  min-height: 82px;
`;

const Input = styled.input`
  width: calc(490px - 186.3px);
  padding: 30px 20px;
  font-weight: 400;
  border-radius: 6px 0 0 6px;
  border: none;
  outline: none;
`;

const DivButtonInput = styled.div`
  border-radius: 0 6px 6px 0;
  background-color: #FFFFFF;
  padding: 10px;
`;

const OpenAccountButton = styled.button`
  border: none;
  width: fit-content;
  background: linear-gradient(180deg, #6209DB 0%, #7613FD 100%);
  border-radius: 6px;
  padding: 20px;
  color: #FFFFFF;
  font-weight: 300;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    filter: grayscale(0.2);
  }
`;