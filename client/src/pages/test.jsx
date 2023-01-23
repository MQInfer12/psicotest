import React from "react";
import Cargando from "../components/globals/cargando";
import TestCard from "../components/test/testCard";
import { useUserContext } from "../context/userContext";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useGet from "../hooks/useGet";
import AddTestButton from "../components/test/addTestButton";
import { AllContainer, DivNothing, TestContainer, TitleSeccion } from "../styles/pages/test";

const Test = () => {
  const windowHeight = useWindowHeight(true, true);
  const { user } = useUserContext();
  const idRole = user?.id_rol;

  const { callAPI: llenarTests, resJson : tests, loading } = useGet(`test/user/${user.id}`);
  
  if(loading) return (<Cargando container windowHeight={windowHeight} />);

  console.log(`test/user/${user.id}`);

  return (
    <AllContainer height={windowHeight} load={loading}>
      <AddTestButton llenarTests={llenarTests} />
      <TitleSeccion>{idRole === 1 ? "Pendientes" : "Mis tests"}</TitleSeccion>
      {
        tests.filter(v => (idRole === 1 && v.estado === 0) || (idRole != 1 && v.id_autor === user.id)).length == 0 ? (
          <DivNothing>{idRole === 1 ? "No tienes tests pendientes." : "¡Crea un test!"}</DivNothing>
        ) : (
          <TestContainer>
            {
              tests
                .filter(v => (idRole === 1 && v.estado === 0) || (idRole != 1 && v.id_autor === user.id))
                .map((v, i) => 
                  <TestCard key={i} {...v} idRole={idRole} llenarTests={llenarTests}/>
                )
            }
          </TestContainer>
        )
      }
      <TitleSeccion>{idRole === 1 ? "Realizados" : "Tests compartidos"}</TitleSeccion>
      {
        tests.filter(v => (idRole === 1 && v.estado === 1) || (idRole != 1 && v.id_autor != user.id)).length === 0 ? (
          <DivNothing>{idRole === 1 ? "No realizaste ningún test aún." : "No tienes tests compartidos"}</DivNothing>
        ) : (
          <TestContainer>
            {
              tests
                .filter(v => (idRole === 1 && v.estado === 1) || (idRole != 1 && v.id_autor != user.id))
                .map((v, i) => 
                  <TestCard key={i} {...v} idRole={idRole} llenarTests={llenarTests}/>
                )
            }
          </TestContainer>
        )
      }
    </AllContainer>
  );
};

export default Test;