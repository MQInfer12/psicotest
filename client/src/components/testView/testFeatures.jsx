import React from "react";
import { useUserContext } from "../../context/userContext";
import styled from "styled-components";
import { addCaracteristica, getCaracteristicasByTest } from "../../services/caracteristica";
import { WhiteButton } from "../../styles/globals/formularios";
import ModalFeature from "./modalFeature";
import { BlackTextLoader, GrayTextLoader, PurpleTextLoader } from "../../styles/globals/loaders";
import { useModal } from "../../hooks/useModal";
import FeatureCard from "./featureCard";
import useGet from "../../hooks/useGet";

const TestFeatures = ({ idTest }) => {
  const { user } = useUserContext();

  const { callAPI: llenarCaracteristicas, resJson: features, loading } = useGet(getCaracteristicasByTest, {id_test: idTest}, [idTest])

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
    <TestInfoContainer>
      <TestInfoTitle>Características</TestInfoTitle>
      {
        user.id_rol == 3 &&
        <WhiteButton onClick={openAdd}>Añadir</WhiteButton>
      }
      <Features>
        {
          loading ? (
            Array(3).fill('').map((v, i) => (
              <FeatureContainer key={i}>
                <IndexContainer>
                  <FeatureIndexContainer>
                    <PurpleTextLoader width="25px" />
                  </FeatureIndexContainer>
                  <FeatureLine></FeatureLine>
                </IndexContainer>
                <IndexContainer>
                  <FeatureTitleContainer>
                    <BlackTextLoader width="150px" fontSize="20px" />
                  </FeatureTitleContainer>
                  <FeatureDescripcionContainer>
                    <GrayTextLoader fontSize="16px" />
                    <GrayTextLoader fontSize="16px" />
                    <GrayTextLoader fontSize="16px" />
                  </FeatureDescripcionContainer>
                </IndexContainer>
              </FeatureContainer>
            ))
          ) : (
            features.map((v, i) => (
              <FeatureCard key={i} index={i} v={v} llenarCaracteristicas={llenarCaracteristicas} user={user} />
            ))
          )
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
  padding: 40px;
  background-color: #FFFFFF;
`;

const TestInfoTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
`;

const Features = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 272px;
  overflow: hidden;

  &:hover > div > .botones {
    transform: translateY(30px);
  }
`;

const IndexContainer = styled.div`
  min-width: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  position: relative;
`;

const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid #D9D9D9;
`;

const FeatureIndexContainer = styled.div`
  height: 30px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureTitleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
`;

const FeatureDescripcionContainer = styled.div`
  width: 200px;
  height: 75px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 7.2px;
`;