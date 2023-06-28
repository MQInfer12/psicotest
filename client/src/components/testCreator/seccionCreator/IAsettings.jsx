import React from 'react'
import { DashPart, Selector } from '../../../styles/pages/testCreator'
import { cambiarTipo } from '../../../services/test';
import { WhiteButton } from '../../../styles/globals/formularios';
import { useModal } from '../../../hooks/useModal';
import ModalPreguntasClave from './modalPreguntasClave';
import { useTestCreatorContext } from '../../../context/testCreatorContext';

const IAsettings = ({ test }) => {
  const defaultTipo = test.type || "sin seleccionar";
  const { secciones } = useTestCreatorContext();

  const handleChange = async (e) => {
    await cambiarTipo(e.target.value, test.id);
  }

  const { openModal, closeModal } = useModal(
    "Preguntas clave",
    <ModalPreguntasClave 
      secciones={secciones}
      cerrar={() => closeModal()}
    />
  )

  return (
    <DashPart>
      <Selector onChange={handleChange} defaultValue={defaultTipo}>
        <option value="sin seleccionar">Sin seleccionar</option>
        <option value="psicométrico">Psicométrico</option>
        <option value="de diagnóstico">Diagnóstico</option>
        <option value="de inteligencia">Inteligencia</option>
        <option value="vocacional">Vocacional</option>
      </Selector>
      <WhiteButton onClick={openModal}>Preguntas clave</WhiteButton>
    </DashPart>
  )
}

export default IAsettings