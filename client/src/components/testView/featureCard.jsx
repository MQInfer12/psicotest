import React from 'react';
import { useModal } from '../../hooks/useModal';
import { deleteCaracteristica, updateCaracteristica } from '../../services/caracteristica';
import { DangerIconButton, WhiteIconButton } from '../../styles/globals/formularios';
import { ButtonContainer, FeatureContainer, FeatureDescription, FeatureIndex, FeatureLine, FeatureTitle, IndexContainer } from '../../styles/pages/testView';
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
          user.id_rol != 1 &&
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