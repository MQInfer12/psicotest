import React from "react";
import { useUserContext } from "../../context/userContext";
import styled from "styled-components";
import { addCaracteristica, getCaracteristicasByTest } from "../../services/caracteristica";
import { WhiteButton } from "../../styles/globals/formularios";
import ModalFeature from "./modalFeature";
import { useModal } from "../../hooks/useModal";
import FeatureCard from "./featureCard";
import useGet from "../../hooks/useGet";

const TestFeatures = ({ idTest, caracteristicas }) => {
  const { user } = useUserContext();

  const { callAPI: llenarCaracteristicas, resJson: features } = useGet(getCaracteristicasByTest, {id_test: idTest}, [idTest], caracteristicas)

  const { openModal: openAdd, closeModal: closeAdd } = useModal(
    "Añadir característica",
    <ModalFeature
      funcion="añadir"
      call={addCaracteristica}
      actualizar={() => {
        llenarCaracteristicas();
        closeAdd();
      }}
      idTest={idTest}
    />
  );

  return (
    (features.length != 0) &&
    <TestInfoContainer>
      <TestInfoTitle>CARACTERÍSTICAS</TestInfoTitle>
      {
        user.id_rol == 3 &&
        <WhiteButton onClick={openAdd}>Añadir</WhiteButton>
      }
      <Features>
        {
          features.map((v, i) => (
            <FeatureCard key={i} index={i} v={v} llenarCaracteristicas={llenarCaracteristicas} user={user} />
          ))
        }
      </Features>
    </TestInfoContainer>
  )
}

export default TestFeatures;

const TestInfoContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const TestInfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;