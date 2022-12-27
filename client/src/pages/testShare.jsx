import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import Cargando from "../components/globals/cargando";
import { addRespuesta } from "../services/respuesta";
import decipherId from "../utilities/decipher";
import codeId from "../utilities/code";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { getDocenteTest } from "../services/test";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TestShareContainer } from "../styles/pages/testShare";

const TestShare = () => {
  const windowHeight = useWindowHeight(true, true);
  const navigate = useNavigate();
  const { idDocenteTest: IdProfessorCode } = useParams();
  const idDocenteTest = Number(decipherId(IdProfessorCode));
  const { user } = useUserContext();

  const createRespuesta = async () => {
    //AÑADIR UNA NUEVA RESPUESTA AL LARAVEL
    const form = {
      email_user: user.email,
      id_docente_test: idDocenteTest,
    };
    const res = await addRespuesta(form);
    const resJson = await res?.json();

    //CREAR CHAT DE FIREBASE CON TU DOCENTE
    const idD = await getDocenteTest(idDocenteTest);
    const idDJson = await idD?.json();

    const combinedId =
      Number(idDJson.id_docente) > Number(user.id)
        ? String(idDJson.id_docente) + String(user.id)
        : String(user.id) + String(idDJson.id_docente);

    try {
      const resChat = await getDoc(doc(db, "chats", combinedId));
      if (!resChat.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", String(idDJson.id_docente)), {
          [combinedId + ".userInfo"]: {
            uid: String(user.id)
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", String(user.id)), {
          [combinedId + ".userInfo"]: {
            uid: String(idDJson.id_docente)
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }

    //ENCRIPTAR LA RUTA HACIA TESTRESOLVE
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
    <TestShareContainer height={windowHeight}>
      <Cargando />
    </TestShareContainer>
  );
};

export default TestShare;