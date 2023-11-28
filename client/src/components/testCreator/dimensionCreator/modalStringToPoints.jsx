import React, { useEffect, useState } from 'react'
import { FormContainer, PurpleButton } from '../../../styles/globals/formularios'
import FormInputsText from '../../globals/formInputsText'
import { initialForm, validationsForm } from '../../../validations/stringToText'

const ModalStringToPoints = ({ close, escala, setValores, setSaveConversiones }) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    reseted: true
  });

  const data = [
    {
      name: "from",
      placeholder: "Puntuaciones naturales",
      error: errors.from,
      value: form.from,
      tipo: "text",
      disabled: false,
    },
    {
      name: "to",
      placeholder: "Puntuación en esta escala",
      error: errors.to,
      value: form.to,
      tipo: "text",
      disabled: false,
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }


  const handleSend = () => {
    let array = form.from.split(" ").filter(v => v !== "" || v !== "-");
    let escalas = form.to.split(" ").filter(v => v !== "" || v !== "-");
    let escalasIndex = 0;
    const resArray = [];
    array.forEach(value => {
      let newValue;
      if(value.includes("-")) {
        const [fromValue, toValue] = value.split("-").map(v => Number(v));
        for(let i = toValue; i >= fromValue; i--) {
          newValue = {
            natural: i,
            escala: +escalas[escalasIndex]
          }
          resArray.push(newValue);
        }
      } else {
        newValue = {
          natural: Number(value),
          escala: +escalas[escalasIndex]
        }
        resArray.push(newValue);
      }
      escalasIndex++;
    });

    setValores(old => old.map(valor => {
      const newValor = {...valor};
      const finded = resArray.find(v => v.natural == valor.natural);
      if(finded) {
        const escalaFind = newValor.conversiones.find(v => v.id_escala === escala.id);
        const newEscalaFind = {...escalaFind};
        newEscalaFind.convertido = finded.escala;
        newValor.conversiones = newValor.conversiones.map(conversion => {
          if(conversion.id_escala === newEscalaFind.id_escala) {
            return newEscalaFind;
          }
          return conversion;
        });
      }
      return newValor;
    }));

    setSaveConversiones(true);
    close();
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0) {
      handleSend();
    }
  }, [errors]);

  return (
    <FormContainer>
      <FormInputsText 
        data={data}
        handleChange={handleChange}
      />
      <PurpleButton onClick={() => setErrors(validationsForm(form))}>Guardar</PurpleButton>
    </FormContainer>
  )
}

export default ModalStringToPoints