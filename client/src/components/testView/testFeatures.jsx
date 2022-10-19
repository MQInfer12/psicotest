import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addCaracteristica, getCaracteristicasByTest, updateCaracteristica, deleteCaracteristica } from "../../services/caracteristica";
import { DangerIconButton, WhiteButton, WhiteIconButton } from "../../styles/formularios";
import Modal from "../globals/modal";
import SureModal from "../globals/sureModal";
import ModalFeature from "./modalFeature";

const TestInfoContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-width: 427px;
  padding: 40px 0px;
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

const FeatureIndex = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #660BE1;
  background-color: #FFFFFF;
  z-index: 1;
`;

const FeatureLine = styled.span`
  height: 60px;
  border-left: 1px solid #D9D9D9;
`;

const FeatureTitle = styled.h2`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: absolute;
  top: 0;
  transition: all 0.5s;
  transform: translateY(-45px);
`;

const TestFeatures = ({ idTest }) => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [featureSelected, setFeatureSelected] = useState(false);
  const [features, setFeatures] = useState([]);

  const llenarCaracteristicas = async () => {
    const res = await getCaracteristicasByTest(idTest);
    const resJson = await res?.json();
    setFeatures(resJson);
  }

  const borrarCaracteristica = async () => {
    const res = await deleteCaracteristica(featureSelected.id);
    const resJson = await res?.json();
    if(resJson) {
      llenarCaracteristicas();
    }
  }

  useEffect(() => {
    llenarCaracteristicas();
  }, []);

  return (
    <TestInfoContainer>
      {
        showForm &&
        <Modal titulo="Añadir característica" cerrar={() => setShowForm(false)}>
          <ModalFeature
            funcion="añadir"
            call={addCaracteristica}
            actualizar={() => {
              llenarCaracteristicas();
              setShowForm(false);
            }}
            idTest={idTest}
          />
        </Modal>
      }
      {
        showUpdate &&
        <Modal titulo="Editar característica" cerrar={() => setShowUpdate(false)}>
          <ModalFeature
            funcion="editar"
            call={updateCaracteristica}
            actualizar={() => {
              llenarCaracteristicas();
              setShowUpdate(false);
            }}
            feature={featureSelected}
          />
        </Modal>
      }
      {
        showDelete &&
        <Modal titulo="Eliminar característica" cerrar={() => setShowDelete(false)}>
          <SureModal
            cerrar={() => setShowDelete(false)}
            sure={borrarCaracteristica}
            text="Se eliminará la característica permanentemente"
          />
        </Modal>
      }
      <TestInfoTitle>Características del Test</TestInfoTitle>
      <WhiteButton onClick={() => setShowForm(true)}>Añadir</WhiteButton>
      <Features>
        {
          features.map((v, i) => (
            <FeatureContainer key={i}>
              <IndexContainer>
                <FeatureIndex>{i < 10 ? "0" + (i + 1) : i + 1}</FeatureIndex>
                <FeatureLine></FeatureLine>
                <ButtonContainer className='botones'>
                  <WhiteIconButton onClick={() => {setFeatureSelected(v); setShowUpdate(true);}}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
                  <DangerIconButton onClick={() => {setFeatureSelected(v); setShowDelete(true);}}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
                </ButtonContainer>
              </IndexContainer>
              <IndexContainer>
                <FeatureTitle>{v.titulo}</FeatureTitle>
                <FeatureDescription>{v.descripcion}</FeatureDescription>
              </IndexContainer>
            </FeatureContainer>
          ))
        }
      </Features>
    </TestInfoContainer>
  )
}

export default TestFeatures;