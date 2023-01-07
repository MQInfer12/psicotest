import React from "react";
import { DivReactivoButtonsTd, PText, ThReactivo } from "../../../styles/pages/testCreator";
import EditarReactivoButton from "../buttons/editarReactivoButton";
import EliminarReactivoButton from "../buttons/eliminarReactivoButton";
import ModificarPredeterminadoButton from "../buttons/modificarPredeterminadoButton";

const ReactivoCard = (props) => {
  return (
    <ThReactivo>
      <PText>{props.descripcion}</PText>
      <DivReactivoButtonsTd>
        <EditarReactivoButton {...props} />
        <ModificarPredeterminadoButton {...props} />
        <EliminarReactivoButton id={props.id} setPuntuaciones={props.setPuntuaciones} />
      </DivReactivoButtonsTd>
    </ThReactivo>
  )
}

export default ReactivoCard;