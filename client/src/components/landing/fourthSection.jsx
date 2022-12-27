import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DivButtonInput, FourthInfoContainer, FourthPurpleDiv, 
  FourthSectionContainer, Input, InputDiv, 
  OpenAccountButton, OpenP, OpenYourAccount 
} from '../../styles/pages/landing';

const FourthSection = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  return (
    <FourthSectionContainer>
      <FourthPurpleDiv>
        <FourthInfoContainer>
          <OpenYourAccount>Registra tu cuenta hoy</OpenYourAccount>
          <OpenP>Es rápido y sencillo, te tomará menos de 2 minutos</OpenP>
          <InputDiv>
            <Input 
              type="email"
              placeholder='Ingresa tu correo electrónico' 
              value={userEmail}  
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <DivButtonInput>
              <OpenAccountButton onClick={() => navigate('/register/email/' + userEmail)}>¡Regístrate!</OpenAccountButton>
            </DivButtonInput>
          </InputDiv>
        </FourthInfoContainer>
      </FourthPurpleDiv>
    </FourthSectionContainer>
  )
}

export default FourthSection