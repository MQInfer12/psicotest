import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { deleteCaracteristica, updateCaracteristica } from '../../services/caracteristica';
import { DangerIconButton, WhiteIconButton } from '../../styles/globals/formularios';
import SureModal from '../globals/sureModal';
import ModalFeature from './modalFeature';

const FeatureCard = ({ index, v, llenarCaracteristicas, user }) => {
  const borrarCaracteristica = async () => {
    const res = await deleteCaracteristica(v.id);
    const resJson = await res?.json();
    if(resJson) {
      llenarCaracteristicas();
    }
  }

  const { openModal: openEdit, closeModal: closeEdit } = useModal(
    "Editar característica",
    <ModalFeature
      funcion="editar"
      call={updateCaracteristica}
      actualizar={() => {
        llenarCaracteristicas();
        closeEdit();
      }}
      feature={v}
    />
  )

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar característica",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarCaracteristica}
      text="Se eliminará la característica permanentemente"
    />
  )

  return (
    <FeatureContainer>
      <IndexContainer>
        <FeatureIndex>{index < 10 ? "0" + (index + 1) : index + 1}</FeatureIndex>
        <FeatureLine></FeatureLine>
        {
          user.id_rol == 3 &&
          <ButtonContainer className='botones'>
            <WhiteIconButton 
              title="Editar característica" 
              onClick={() => {
                openEdit();
              }}
            ><i className="fa-solid fa-pencil"></i></WhiteIconButton>
            <DangerIconButton 
              title="Eliminar característica" 
              onClick={() => {
                openDelete();
              }}><i className="fa-solid fa-trash-can"></i></DangerIconButton>
          </ButtonContainer>
        }
      </IndexContainer>
      <IndexContainer>
        <FeatureTitle>{v.titulo}</FeatureTitle>
        <FeatureDescription>{v.descripcion}</FeatureDescription>
      </IndexContainer>
    </FeatureContainer>
  )
}

export default FeatureCard;

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