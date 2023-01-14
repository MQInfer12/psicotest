import React from 'react'
import { useEffect } from 'react';
import { DivInputBox, DivInputsNumber, IInput, InputText, Instructions } from '../../styles/pages/login';

const FormCode = ({ form, errors, handleChange }) => {
  let data = [
    {
      name: "num1",
      value: form.num1,
      placeholder: "-"
    },
    {
      name: "num2",
      value: form.num2,
      placeholder: "-"
    },
    {
      name: "num3",
      value: form.num3,
      placeholder: "-"
    },
    {
      name: "num4",
      value: form.num4,
      placeholder: "-"
    },
    {
      name: "num5",
      value: form.num5,
      placeholder: "-"
    },
    {
      name: "num6",
      value: form.num6,
      placeholder: "-"
    },
  ];

  //CAMBIAR DE FOCUS DE INPUTS DINAMICAMENTE
  useEffect(() => {
    var focussableElements = 'input[type=text]:not([disabled])';
    if (document.activeElement && document.activeElement.form) {
      var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
      function (element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
      });
      var index = focussable.indexOf(document.activeElement);
      if(index > -1 && document.activeElement.value) {
        var nextElement = focussable[index + 1];
        nextElement?.focus();
      } else if (!document.activeElement.value) {
        var backElement = focussable[index - 1];
        backElement?.focus();
      }
    }
  }, [form]);

  return (
    <>
    <Instructions>Escribe aquí el código de 6 dígitos que enviamos a tu correo, si no lo encuentras revisa en la sección de spam.</Instructions>
    <DivInputsNumber>
      {
        data.map((v, i) => (
          <DivInputBox key={i}>
            <InputText centerText required
              className='numeros'
              maxLength="1"
              pattern="\d*"
              type="text"
              name={v.name}
              onChange={handleChange}
              value={v.value}
              placeholder={v.placeholder}
            />
            <IInput lento mostrarError={errors[v.name]}></IInput>
          </DivInputBox>
        ))
      }
    </DivInputsNumber>
    </>
  )
}

export default FormCode