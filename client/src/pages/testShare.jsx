import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import { addRespuesta } from "../services/respuesta";
import decipherId from "../utilities/decipher";
import codeId from "../utilities/code";

const TestShare = () => {
  const navigate = useNavigate();
  const { idDocenteTest: IdProfessorCode } = useParams();
  const idDocenteTest = Number(decipherId(IdProfessorCode));

  const { user } = useContext(UserContext);
  const createRespuesta = async () => {
    const form = {
      email_user: user.email,
      id_docente_test: idDocenteTest,
    };
    const res = await addRespuesta(form);
    const resJson = await res?.json();

    let stringInd = resJson.id.toString();
    let idCode = codeId(stringInd);

    if (res.ok) {
      navigate("/dashboard/tests/testresolve/" + idCode);
    }
  };

  useEffect(() => {
    createRespuesta();
  }, []);

  return (
    <TestShareContainer>
      <Cargando />
    </TestShareContainer>
  );
};

export default TestShare;

const TestShareContainer = styled.div`
  height: 100%;

  @media (max-width: 1135px) {
    height: calc(100vh - 197px);
  }
`;
