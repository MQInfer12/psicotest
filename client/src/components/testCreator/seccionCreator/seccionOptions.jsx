import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { MiniWhiteIconButton, WhiteIconButton } from '../../../styles/globals/formularios'
import { PLightDouble } from '../../../styles/globals/table';
import { ButtonContainer, DashPart, DashTitle } from '../../../styles/pages/testCreator'
import AñadirSeccionButton from '../buttons/añadirSeccionButton';
import EliminarSeccionButton from '../buttons/eliminarSeccionButton';
import Points from '../points';
import ModalSeccion from './modalSeccion';

const SeccionOptions = ({ test, loading, setLoading, optionState }) => {
  const { option, setOption } = optionState;
  const { seccion, secciones, seccionActual, setSeccionActual, updateSeccion } = useTestCreatorContext();

  const { openModal, closeModal } = useModal(
    "Editar sección",
    <ModalSeccion 
      seccion={seccion}
      actualizar={res => {
        updateSeccion(seccion => {
          return {...seccion, ...res.data};
        });
        closeModal();
      }}
    />
  )

  return (
    <DashPart>
      <DashTitle>
        <span>{seccion ? seccion.nombre : "Sección nueva"}</span>
        {seccion ? 
          <MiniWhiteIconButton onClick={openModal}>
            <i className="fa-solid fa-pencil"></i>
          </MiniWhiteIconButton>
          : <div></div>
        }
      </DashTitle>
      <PLightDouble red={seccion ? !seccion.instruccion : false} center noPadding minHeight="36px">
        {seccion ? 
          seccion.instruccion ? seccion.instruccion 
          : "Añade una instrucción para ayudar a resolver posibles dudas." 
        : "Añade una nueva sección editar sus preguntas y reactivos."}
      </PLightDouble>
      <ButtonContainer>
        <WhiteIconButton disabled={seccionActual === 0} onClick={() => setSeccionActual(oldSeccionActual => oldSeccionActual - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </WhiteIconButton>
        {
          seccion ? (
            <EliminarSeccionButton />
          ) : (
            <AñadirSeccionButton 
              loading={loading} 
              setLoading={setLoading} 
              id={test.id} 
            />
          )
        }
        <WhiteIconButton disabled={!seccion} onClick={() => setSeccionActual(oldSeccionActual => oldSeccionActual + 1)}>
          <i className="fa-solid fa-angle-right"></i>
        </WhiteIconButton>
      </ButtonContainer>
      <Points array={secciones} state={seccionActual} setState={setSeccionActual} />
      <ButtonContainer>
        {
          seccion &&
          <WhiteIconButton title="Mostrar opciones de sección" active={option === 0} onClick={() => setOption(0)}>
            <i className="fa-solid fa-gear"></i>
          </WhiteIconButton>
        }
        <WhiteIconButton title="Mostrar índice" active={option === 1} onClick={() => setOption(1)}>
          <i className="fa-solid fa-indent"></i>
        </WhiteIconButton>
      </ButtonContainer>
    </DashPart>
  )
}

export default SeccionOptions