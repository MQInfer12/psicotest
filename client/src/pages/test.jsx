import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../components/globals/modal";
import ModalTest from "../components/test/modalTest";
import TestCard from "../components/test/testCard";
import { addTest, getTests } from "../services/test";

const TestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PurpleButton = styled.button`
  height: 42px;
  border: none;
  padding: 8px 26px 8px 26px;
  background-color: #660BE1;
  border-radius: 8px;
  color: #D9D9D9;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  text-transform: capitalize;
`;

const Test = () => {
  const [tests, setTests] = useState([]);  
  const [showForm, setShowForm] = useState(false);  
  
  const llenarTests = async () => {
    const res = await getTests();
    const resJson = await res?.json();
    setTests(resJson);
  }

  useEffect(() => {
    llenarTests();
  }, []);

  return (
    <TestContainer>
      <ButtonContainer>
        <PurpleButton onClick={() => setShowForm(true)}>Añadir</PurpleButton>
      </ButtonContainer>
      {
        showForm &&
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
      }

      {
        tests.map((v, i) => (
          <TestCard key={i} {...v} llenarTests={llenarTests} />
        ))
      }
    </TestContainer>
  );
};

export default Test;
