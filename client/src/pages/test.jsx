import React from "react";
import Cargando from "../components/globals/cargando";
import TestCard from "../components/test/testCard";
import { useUserContext } from "../context/userContext";
import { getTests, getTestsToBenef, getTestsToProfessor } from "../services/test";
import { useWindowHeight } from "../hooks/useWindowHeight";
import useGet from "../hooks/useGet";
import AddTestButton from "../components/test/addTestButton";
import { AllContainer, DivNothing, TestContainer, TitleSeccion } from "../styles/pages/test";

const Test = () => {
  const windowHeight = useWindowHeight(true, true);
  const { user } = useUserContext();
  const idRole = user?.id_rol;

  //TODO: Cambiar useGet
  const { callAPI: llenarTests, resJson : tests, loading } = useGet(
    idRole === 3 ? getTests : idRole === 2 ? getTestsToProfessor : getTestsToBenef,
    { id: user?.id }
  );
  
  if(loading) return (<Cargando container windowHeight={windowHeight} />);

  return (
    <AllContainer height={windowHeight} load={loading}>
      {idRole === 3 && (
        <AddTestButton llenarTests={llenarTests} />
      )}
      {idRole === 1 && <TitleSeccion>Pendientes</TitleSeccion>}
      {
        tests.filter(v => idRole != 1 || v.estado === 0).length == 0 ? (
          <DivNothing>
            {
              idRole === 1 ? "No tienes tests pendientes." :
              idRole === 2 ? "No te asignaron tests aún." :
              "¡Crea un test!"
            }
          </DivNothing>
        ) : (
          <TestContainer>
            {idRole === 1 ?
              tests.filter(v => v.estado === 0).map((v, i) => <TestCard key={i} {...v} idRole={idRole} llenarTests={llenarTests}/>) :
              tests.map((v, i) => <TestCard key={i} {...v} idRole={idRole} llenarTests={llenarTests} />)
            }
          </TestContainer>
        )
      }
      {idRole === 1 && (
        <>
          <TitleSeccion>Realizados</TitleSeccion>
          {
            tests.filter(v => v.estado === 1).length === 0 ? (
              <DivNothing>No realizaste ningún test aún.</DivNothing>
            ) : (
              <TestContainer>
                {
                  tests.filter(v => v.estado === 1).map((v, i) => (
                    <TestCard key={i} {...v} idRole={idRole}/>
                  ))
                }
              </TestContainer>
            )
          }
        </>
      )}
    </AllContainer>
  );
};

export default Test;