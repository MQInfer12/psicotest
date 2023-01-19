import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import decipherId from "../utilities/decipher";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { addCollaborator } from "../services/test";
import { TestShareContainer } from "../styles/pages/testShare";

const Collaborate = () => {
  const windowHeight = useWindowHeight(true, true);
  const navigate = useNavigate();
  const { idTest: idTestCode } = useParams();
  const idTest = Number(decipherId(idTestCode));
  const { user } = useUserContext();

  const createCollaborator = async () => {
    //AÑADIR UNA NUEVA RESPUESTA AL LARAVEL
    const form = {
      id_user: user.id,
    };
    const res = await addCollaborator(form, idTest);

    if (res.ok) {
      navigate("/dashboard/tests");
    }
  };

  useEffect(() => {
    createCollaborator();
  }, []);

  return (
    <TestShareContainer height={windowHeight}>
      <Cargando />
    </TestShareContainer>
  );
};

export default Collaborate;