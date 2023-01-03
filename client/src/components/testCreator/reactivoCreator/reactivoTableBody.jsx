import React from 'react'
import { useState } from 'react';
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { turnPuntuaciones } from '../../../services/puntuacion';
import { WhiteIconButton } from '../../../styles/globals/formularios';
import { ButtonReactivosTr, ResponsiveTr, ThNumber } from '../../../styles/globals/table';
import { InputNumber } from '../../../styles/pages/testCreator';

const ReactivoTableBody = ({ reactivosPage, tableRows, rowHeight, puntuaciones, setPuntuaciones, setSave }) => {
  const [blink, setBlink] = useState(false);
  
  const { seccion, updateSeccion } = useTestCreatorContext();

  const handleChange = (e) => {
    setSave(true);
    const {name, value} = e.target;

    let puntuacion = puntuaciones.find(obj => {
      return obj.id == name
    })
    puntuacion.asignado = Number(value);

    setPuntuaciones(old => [...old]);
  }

  const handleTurn = async (idPregunta) => {
    const res = await turnPuntuaciones(idPregunta);
    if(res.ok) {
      const resJson = await res?.json();
      updateSeccion(seccion => {
        const newPuntuaciones = seccion.puntuaciones.map(puntuacion => {
          if(puntuacion.id_pregunta === idPregunta) {
            puntuacion = resJson.data.find(va => va.id === puntuacion.id);
          }
          return puntuacion;
        });
        seccion.puntuaciones = newPuntuaciones;
        setPuntuaciones(newPuntuaciones);
        return seccion;
      });
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 500);
    }
  }

  return (
    seccion.preguntas.filter((v, i) => i >= (reactivosPage - 1) * tableRows && i < reactivosPage * tableRows).map((v, i) => (
      <ResponsiveTr rowHeight={rowHeight} key={i}>
        <ThNumber>
          {((reactivosPage - 1) * tableRows) + (i + 1)}
          <ButtonReactivosTr className="buttons">
            {/* FIXME: EL BOTON SE OCULTA AL SALIR DE LA TABLA */}
            <WhiteIconButton title="Voltear puntuaciones" onClick={() => handleTurn(v.id)}>
              <i className="fa-solid fa-arrow-right-arrow-left"></i>
            </WhiteIconButton>
          </ButtonReactivosTr>
        </ThNumber>
        {
          puntuaciones.filter(va => va.id_pregunta == v.id).map((va, j) => (
            <td key={j}>
              {/* FIXME: TODOS LOS INPUTS BLINKEAN */}
              <InputNumber 
                blink={blink}
                name={va.id}
                type="number"
                value={va.asignado}
                onChange={handleChange}
              />
            </td>
          )) 
        }
      </ResponsiveTr>
    ))
  )
}

export default ReactivoTableBody