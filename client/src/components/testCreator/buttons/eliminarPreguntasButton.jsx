import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { massDestroy } from '../../../services/pregunta';
import { DangerIconButton } from '../../../styles/globals/formularios'
import SureModal from '../../globals/sureModal';

const EliminarPreguntasButton = ({ selecteds, setSelecteds }) => {
  const { updateSeccion, setDimensiones } = useTestCreatorContext();

  const borrarPreguntas = async () => {
    const res = await massDestroy(selecteds);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newSeccion = {...seccion};
        newSeccion.preguntas = newSeccion.preguntas.filter((pregunta) => !selecteds.includes(pregunta.id));
        newSeccion.puntuaciones = newSeccion.puntuaciones.filter((puntuacion) => !selecteds.includes(puntuacion.id_pregunta));
        return newSeccion;
      });
      setDimensiones(old => {
        return old.map(dimension => {
          const newDimension = {...dimension};
          newDimension.preguntas = newDimension.preguntas.filter(pregunta => !selecteds.includes(pregunta));
          const resDimension = resJson.data.find(dim => dim.id === dimension.id);
          if(resDimension) {
            dimension.valores = resDimension.valores;
          }
          return newDimension;
        })
      });
      setSelecteds([]);
      console.log("Se borraron las preguntas");
    }
  }

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar preguntas",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarPreguntas}
      text={"Se eliminarán " + selecteds.length + " preguntas permanentemente"}
    />
  );

  return (
    <DangerIconButton 
      title="Eliminar preguntas seleccionadas" 
      disabled={selecteds.length == 0} 
      onClick={openDelete}
    >
      <i className="fa-solid fa-trash-can"></i>
    </DangerIconButton>
  )
}

export default EliminarPreguntasButton