import React from 'react'
import { useState } from 'react';
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { changeOrden } from '../../../services/seccion';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import { ButtonContainer, DashIndex, Details, List, PreguntasList } from '../../../styles/pages/testCreator'

const SeccionIndex = () => {
  const { secciones, setSecciones } = useTestCreatorContext();
  const [movible, setMovible] = useState(false);
  const [newSecciones, setNewSecciones] = useState(secciones);

  const changeMovible = async () => {
    const newMovible = !movible;
    setMovible(newMovible);
    if(newMovible) {
      const detalles = document.querySelectorAll(".detalle-seccion");
      detalles.forEach(detalle => {
        detalle.removeAttribute("open");
      });
    } else {
      let ordenes = {};
      newSecciones.forEach((seccion, i) => {
        ordenes[seccion.id] = i + 1
      });
      console.log(ordenes);
      const res = await changeOrden(ordenes);
      if(res.ok) {
        setSecciones(newSecciones);
      }
    }
  }

  const handleUp = (i) => {
    const reordenar = [...newSecciones];
    const aux = reordenar[i - 1];
    reordenar[i - 1] = reordenar[i];
    reordenar[i] = aux;
    setNewSecciones(reordenar);
  }

  const handleDown = (i) => {
    const reordenar = [...newSecciones];
    const aux = reordenar[i + 1];
    reordenar[i + 1] = reordenar[i];
    reordenar[i] = aux;
    setNewSecciones(reordenar);
  }

  return (
    <DashIndex noBorder>
      <ButtonContainer padding>
        <WhiteIconButton title="Ordenar" /* active={movible} */ onClick={changeMovible}>
          {movible ? <i className="fa-solid fa-floppy-disk"></i> : <i className="fa-solid fa-arrows-up-down"></i>}
        </WhiteIconButton>
      </ButtonContainer>
      <List className="lista-secciones">
        {
          Object.values(newSecciones).map((seccion, i) => (
            <Details key={i} movible={movible} className="detalle-seccion">
              <summary>
                {seccion.nombre}
                {
                  movible &&
                  <ButtonContainer>
                    <WhiteIconButton title="Mover arriba" disabled={i === 0} onClick={() => handleUp(i)}>
                      <i className="fa-solid fa-arrow-up"></i>
                    </WhiteIconButton>
                    <WhiteIconButton title="Mover abajo" disabled={i === secciones.length - 1} onClick={() => handleDown(i)}>
                      <i className="fa-solid fa-arrow-down"></i>
                    </WhiteIconButton>
                  </ButtonContainer>
                }
              </summary>
              <PreguntasList>
                {
                  seccion.preguntas.map((pregunta, j) => (
                    <li key={j}>Pregunta {j + 1}</li>
                  ))
                }
              </PreguntasList>
            </Details>
          ))
        }
      </List>
    </DashIndex>
  )
}

export default SeccionIndex