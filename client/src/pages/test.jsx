import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Cargando from "../components/globals/cargando";
import Modal from "../components/globals/modal";
import ModalTest from "../components/test/modalTest";
import TestCard from "../components/test/testCard";
import { UserContext } from "../context/userContext";
import { addTest, getTests, getTestsToBenef, getTestsToProfessor } from "../services/test";
import TestCardProfessor from "../components/test/testCardProfessor";
import TestCardBenef from "../components/test/testCardBenef";
import { PurpleButton } from "../styles/formularios";

const Test = () => {
  const [tests, setTests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const idRole = user.id_rol;

  const llenarTests = async () => {
    const res = await getTests();
    const resJson = await res?.json();
    setTests(resJson);
    setLoading(false);
  };

  const llenarTestsToProfessor = async () => {
    const res = await getTestsToProfessor(user.id);
    const resJson = await res?.json();
    setTests(resJson);
    setLoading(false);
  };

  const llenarTestsToBenef = async () => {
    const res = await getTestsToBenef(user.id);
    const resJson = await res?.json();
    setTests(resJson);
    setLoading(false);
  }

  useEffect(() => {
    if (idRole === 3) {
      llenarTests();
    }
    if (idRole === 2) {
      llenarTestsToProfessor();
    }
    if (idRole === 1) {
      llenarTestsToBenef();
    }
  }, []);

  return (
    <AllContainer load={loading}>
      {showForm && (
        <Modal cerrar={() => setShowForm(false)} titulo="Añadir test">
          <ModalTest
            call={addTest}
            actualizar={() => {
              llenarTests();
              setShowForm(false);
            }}
            funcion="añadir"
          />
        </Modal>
      )}
      {loading ? (
        <Cargando />
      ) : (
        <>
          {idRole === 3 && (
            <ButtonContainer>
                <PurpleButton onClick={() => setShowForm(true)}>Añadir</PurpleButton>
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
                {idRole === 3 &&
                  tests.map((v, i) => <TestCard key={i} {...v} llenarTests={llenarTests} />
                )}
                {idRole === 2 &&
                  tests.map((v, i) => <TestCardProfessor key={i} {...v} id={v.id} llenarTests={llenarTestsToProfessor} />
                )}
                {idRole === 1 &&
                  tests.filter(v => v.estado === 0).map((v, i) => <TestCardBenef key={i} {...v}/>
                )}
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
                          <TestCardBenef key={i} {...v}/>
                        ))
                      }
                    </TestContainer>
                  )
                }
            </>
          )}
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
  height: ${props => props.load && "calc(100vh - 197px)"};
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