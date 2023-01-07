import React from 'react'
import { WhiteIconButton } from '../../../styles/globals/formularios';

const SeleccionarPreguntasButton = ({ selected, setSelected, selecteds, setSelecteds, id }) => {
  const selectPregunta = () => {
    if(!selecteds.includes(id)) {
      setSelecteds(old => [...old, id]);
      setSelected(true);
    } else {
      setSelecteds(old => old.filter(value => value != id));
      setSelected(false);
    }
  }
  
  return (
    <WhiteIconButton 
      title="Seleccionar pregunta"
      onClick={selectPregunta}
    >
      {
        selected ? (
          <i className="fa-solid fa-square-check"></i>
        ) : (
          <i className="fa-regular fa-square-check"></i>
        )
      }
    </WhiteIconButton>
  )
}

export default SeleccionarPreguntasButton