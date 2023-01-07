import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { WhiteIconButton } from '../../../styles/globals/formularios'
import { ButtonContainer, DashPart, DashTitle } from '../../../styles/pages/testCreator'
import AñadirSeccionButton from '../buttons/añadirSeccionButton';
import EliminarSeccionButton from '../buttons/eliminarSeccionButton';
import Points from '../points';

const SeccionOptions = ({ test, loading, setLoading, optionState }) => {
  const { option, setOption } = optionState;
  const { seccion, secciones, seccionActual, setSeccionActual, setSecciones } = useTestCreatorContext();

  return (
    <DashPart>
      <DashTitle>{seccion ? seccion.nombre : "Sección nueva"}</DashTitle>
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