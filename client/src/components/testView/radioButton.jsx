import React from 'react';
import { Checkbox, CheckContainer, ReactivoContainer } from '../../styles/pages/testView';

const RadioButton = ({ indice, setResultados, valor, descripcion, multimarcado }) => {
  const handleChange = (target) => {
    const name = indice;
    const { value } = target;

    if(!multimarcado) {
      if(!target.checked)  {
        setResultados(old => ({
          ...old,
          [name]: value,
          }));
          target.checked = true;
      } else {
        setResultados(old => (
          Object.keys(old)
            .filter((key) => !key.includes(name))
            .reduce((cur, key) => { return Object.assign(cur, { [key]: old[key] })}, {})
        ));
        target.checked = false;
      }
    } else {
      if(!target.checked)  {
        setResultados(old => {
          let arr = old[name];
          if(arr) {
            arr.push(value);
          } else {
            arr = [value];
          }
          return {
            ...old,
            [name]: arr,
          }});
          target.checked = true;
      } else {
        setResultados(old => {
          let arr = old[name];
          if(arr.length === 1) {
            return Object.keys(old)
              .filter((key) => !key.includes(name))
              .reduce((cur, key) => { return Object.assign(cur, { [key]: old[key] })}, {})
          } else {
            const newArr = arr.filter((val) => val != value);
            return {
              ...old,
              [name]: newArr
            };
          }
        });
        target.checked = false;
      }
    }
  };
  
  return (
    <ReactivoContainer onClick={(e) => handleChange(e.target.children[0].children[0])}>
      <CheckContainer multimarcado={multimarcado} className="cbx">
        <Checkbox 
          type={multimarcado ? "checkbox" : "radio"}
          name={indice} 
          value={valor}
          multimarcado={multimarcado}
        />
        <label></label>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
      </CheckContainer>
      {descripcion}
    </ReactivoContainer>
  )
}

export default RadioButton;