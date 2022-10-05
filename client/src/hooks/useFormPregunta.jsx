import { useState, useEffect } from "react";
import { addPregunta, updatePregunta } from "../services/pregunta";

export const UseForm = ( initialForm, validateForm, success, funcion, id, idSeccion ) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    console.log(funcion);
    if(funcion == "añadir") {
      try {
        const res = await addPregunta(form, idSeccion);
        const resJson = await res?.json();
        if(resJson.mensaje =="se guardo correctamente"){
          console.log("Se creó una nueva pregunta!");
          success();
        }
      } catch (err) {
        console.log(err);
      }
    } else if(funcion == "editar") {
      try {
        const res = await updatePregunta(form, id);
        const resJson = await res?.json();
        if(resJson.mensaje =="se guardo correctamente"){
          console.log("Se actualizó el test!");
          success();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFill = (pregunta) => {
    const obj = {
      id_seccion: idSeccion,
      descripcion: pregunta.descripcion
    }

    setForm(obj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  //CUANDO CAMBIEN LOS ERRORES
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    if(effects) {
      if (Object.keys(errors).length === 0) {
        handleSend(form);
      }
    }
    setEffects(true);
  }, [errors]);

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleFill
  };
};
