import React, { useEffect, useState } from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { CheckboxDiv, CheckboxInput, PCheckbox } from '../../../styles/pages/testCreator';

const Checkbox = ({ name, call, text }) => {
  const { seccion, setSecciones, seccionActual } = useTestCreatorContext();

  const [active, setActive] = useState(seccion[name]);

  const handleChange = async () => {
    const res = await call(seccion.id);
    if(res.ok) {
      setSecciones(old => {
        return old.map((v, i) => {
          if(i === seccionActual) {
            return {
              ...v,
              [name]: !v[name]
            };
          }
          return v;
        })
      })
      console.log("Se cambió correctamente");
    }
  }
  
  useEffect(() => {
    setActive(seccion[name]);
  }, [seccion]);

  return (
    <CheckboxDiv>
      <CheckboxInput type="checkbox" checked={active} onChange={handleChange} /> 
      <PCheckbox>{text}</PCheckbox>
    </CheckboxDiv>
  )
}

export default Checkbox