import React, { useEffect, useContext } from 'react';
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
    console.log(res);
    const resJson = await res?.json();
    console.log(resJson);
    if (res.ok) {
      navigate('/dashboard/tests/testresolve/' + resJson.id);
    } 
  }

  useEffect(() => {
    createRespuesta();
  }, []);

  return (
    <Cargando />
  )
}

export default TestShare