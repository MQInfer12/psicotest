import React from "react";
import styled from "styled-components";
import Cargando from "../components/globals/cargando";
import ModalTest from "../components/test/modalTest";
import TestCard from "../components/test/testCard";
import { useUserContext } from "../context/userContext";
import { addTest, getTests, getTestsToBenef, getTestsToProfessor } from "../services/test";
import { PurpleButton } from "../styles/globals/formularios";
import { useWindowHeight } from "../hooks/useWindowHeight";
import { useModal } from "../hooks/useModal";
import useGet from "../hooks/useGet";

const Test = () => {
  const windowHeight = useWindowHeight(true, true);
  const { user } = useUserContext();
  const idRole = user?.id_rol;

  const { callAPI: llenarTests, resJson : tests, loading } = useGet(
    idRole === 3 ? getTests : idRole === 2 ? getTestsToProfessor : getTestsToBenef,
    { id: user?.id }
  );

  const { openModal, closeModal } = useModal(
    "Añadir test",
    <ModalTest
      call={addTest}
      actualizar={() => {
        llenarTests();
        closeModal();
      }}
      funcion="añadir"
    />
  )
  
  if(loading) return (<Cargando container windowHeight={windowHeight} />);

  return (
    <AllContainer height={windowHeight} load={loading}>
      {idRole === 3 && (
        <ButtonContainer>
            <PurpleButton onClick={openModal}>Añadir</PurpleButton>
        </ButtonContainer>
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

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: ${props => props.height};
`;

const TestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1020px) {
    justify-content: space-around;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TitleSeccion = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #3E435D;
`;

const DivNothing = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #ADA7A7;
  font-size: 16px;
  font-weight: 300;
`;