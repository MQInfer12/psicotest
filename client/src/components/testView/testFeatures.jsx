import React from "react";
import { useUserContext } from "../../context/userContext";
import { addCaracteristica } from "../../services/caracteristica";
import { WhiteButton } from "../../styles/globals/formularios";
import ModalFeature from "./modalFeature";
import { useModal } from "../../hooks/useModal";
import FeatureCard from "./featureCard";
import useGet from "../../hooks/useGet";
import { Features, TestInfoContainer, TestInfoTitle } from "../../styles/pages/testView";

const TestFeatures = ({ autor, idTest, caracteristicas }) => {
  const { user } = useUserContext();

  const { callAPI: llenarCaracteristicas, resJson: features } = useGet(`caracteristica/test/${idTest}`, { initialValue: caracteristicas });

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
    (features.length != 0 || user.id_rol != 1) && 
    <TestInfoContainer>
      <TestInfoTitle>Características</TestInfoTitle>
      { (user.id_rol != 1 && autor === user.id) && <WhiteButton onClick={openAdd}>Añadir</WhiteButton> }
      <Features>
        {
          features.map((v, i) => (
            <FeatureCard key={i} index={i} v={v} llenarCaracteristicas={llenarCaracteristicas} user={user} autor={autor}/>
          ))
        }
      </Features>
    </TestInfoContainer>
  )
}

export default TestFeatures;