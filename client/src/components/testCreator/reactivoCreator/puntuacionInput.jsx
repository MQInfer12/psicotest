import React from 'react'
import { InputNumber } from '../../../styles/pages/testCreator'

const PuntuacionInput = ({ id, value, blink, puntuaciones, setPuntuaciones, setSave }) => {
  const handleChange = (e) => {
    setSave(true);
    console.log(e.target);
    const {name, value} = e.target;

    let puntuacion = puntuaciones.find(obj => obj.id == name);
    puntuacion.asignado = Number(value);

    setPuntuaciones(old => [...old]);
  }

  return (
    <InputNumber 
      blink={blink}
      name={id}
      type="number"
      value={value}
      onChange={handleChange}
    />
  )
}

export default PuntuacionInput