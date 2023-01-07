import React, { useState, useEffect } from "react";
import { 
  ResponsiveTr, ThNumber, DivDouble, PLight
} from "../../../styles/globals/table";
import { DivButtonsTd } from "../../../styles/pages/testCreator";
import EditarPreguntaButton from "../buttons/editarPreguntaButton";
import SeleccionarPreguntasButton from "../buttons/seleccionarPreguntasButton";

const PreguntaCard = (props) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    props.selecteds.includes(props.id)? setSelected(true) : setSelected(false);
  });

  return (
    <ResponsiveTr 
      inTestCreator
      selectedPregunta={selected}
      rowHeight={props.rowHeight}
    >
      <ThNumber>{props.index}</ThNumber>
      <td>
        <DivDouble>
          <PLight>{props.descripcion}</PLight>
        </DivDouble>
        <DivButtonsTd>
          <EditarPreguntaButton {...props} />
          <SeleccionarPreguntasButton 
            selected={selected}
            setSelected={setSelected}
            selecteds={props.selecteds} 
            setSelecteds={props.setSelecteds}
            id={props.id}
          />
        </DivButtonsTd>
      </td>
    </ResponsiveTr>
  )
}

export default PreguntaCard;