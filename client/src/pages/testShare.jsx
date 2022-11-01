import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/userContext';
import { useParams, useNavigate } from 'react-router-dom';
import Cargando from '../components/globals/cargando';
import { addRespuesta } from '../services/respuesta';

const TestShare = () => {
  const navigate = useNavigate();
  const { idDocenteTest } = useParams();
  const { user } = useContext(UserContext);

  const createRespuesta = async () => {
    const form = {
      email_user: user.email,
      id_docente_test: idDocenteTest,
    }
    const res = await addRespuesta(form);
    const resJson = await res?.json();
    if (res.ok) {
      navigate('/dashboard/tests/testresolve/' + resJson.id);
    }
  }

  useEffect(() => {
    createRespuesta();
  }, []);

  return (
    <TestShareContainer>
      <Cargando />
    </TestShareContainer>
  )
}

export default TestShare;

const TestShareContainer = styled.div`
  height: 100%;

  @media (max-width: 1135px) {
    height: calc(100vh - 197px);
  }
`;