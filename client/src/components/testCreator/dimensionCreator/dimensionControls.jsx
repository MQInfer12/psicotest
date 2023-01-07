import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { useModal } from '../../../hooks/useModal'
import { addDimension, deleteDimension, updateDimension } from '../../../services/dimension'
import { DangerIconButton, WhiteIconButton } from '../../../styles/globals/formularios'
import { ControlsContainer, TwoRows } from '../../../styles/globals/table'
import { PText } from '../../../styles/pages/testCreator'
import SureModal from '../../globals/sureModal'
import Points from '../points'
import ModalAsignarPregunta from './modalAsignarPregunta'
import ModalDimension from './modalDimension'

const DimensionControls = ({ dimensionActualState }) => {
  const { dimensionActual, setDimensionActual } = dimensionActualState;
  const { seccion, secciones, setDimensiones, dimensiones } = useTestCreatorContext();
  const dimension = dimensionActual != dimensiones.length ? dimensiones[dimensionActual] : undefined;

  const { openModal, closeModal } = useModal(
    "Añadir dimension",
    <ModalDimension 
      call={addDimension}
      funcion="Añadir"
      actualizar={(res) => {
        setDimensiones(old => [...old, res.data]);
        closeModal();
      }}
      idTest={seccion.id_test}
    />
  )

  const { openModal: openEditar, closeModal: closeEditar } = useModal(
    "Editar dimensión",
    <ModalDimension 
      call={updateDimension}
      funcion="Editar"
      actualizar={res => {
        setDimensiones(old => old.map(dimension => {
          if(dimension.id === res.data.id) {
            return {...dimension, ...res.data};
          }
          return dimension;
        }));
        closeEditar();
      }}
      dimension={dimension}
    />
  )

  const borrarDimension = async () => {
    const res = await deleteDimension(dimension.id);
    if(res.ok) {
      setDimensiones(old => {
        const newDimensiones = old.filter(dim => dim.id != dimension.id);
        return newDimensiones;
      });
    }
  }

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar dimensión",
    <SureModal 
      sure={borrarDimension}
      cerrar={() => closeDelete()}
      text="Se eliminará la dimensión permanentemente"
    />
  )
  
  const { openModal: openAsignar, closeModal: closeAsignar } = useModal(
    "Asignar preguntas",
    <ModalAsignarPregunta 
      secciones={secciones}
      dimension={dimension}
      setDimensiones={setDimensiones}
      cerrar={() => closeAsignar()}
    />
  )

  return (
    <ControlsContainer spaceBetween>
      <div>
        <WhiteIconButton title="Dimensión anterior" disabled={dimensionActual === 0} onClick={() => setDimensionActual(old => old - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </WhiteIconButton>
        {
          dimension ? (
            <WhiteIconButton title="Dimensión siguiente" onClick={() => setDimensionActual(old => old + 1)}>
              <i className="fa-solid fa-angle-right"></i>
            </WhiteIconButton>
          ) : (
            <WhiteIconButton title="Añadir dimensión" onClick={openModal}>
              <i className="fa-solid fa-plus"></i>
            </WhiteIconButton>
          )
        }
      </div>
      <TwoRows>
        {
          dimension ? (
            <PText>{dimension.descripcion}</PText>
          ) : (
            <PText>Crea una dimensión para tus preguntas</PText>
          )
        }
        <Points array={dimensiones} state={dimensionActual} setState={setDimensionActual} />
      </TwoRows>
      <div>
        <WhiteIconButton disabled={!dimension} title="Asignar preguntas" onClick={openAsignar}>
          <i className="fa-solid fa-clipboard-check"></i>
        </WhiteIconButton>
        <WhiteIconButton disabled={!dimension} title="Editar dimensión" onClick={openEditar}>
          <i className="fa-solid fa-pencil"></i>
        </WhiteIconButton>
        <DangerIconButton disabled={!dimension} title="Eliminar dimensión" onClick={openDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </DangerIconButton>
      </div>
    </ControlsContainer>
  )
}

export default DimensionControls