import { useState, useEffect } from "react";
import { addReactivo, updateReactivo } from "../services/reactivo";

export const UseForm = ( initialForm, validateForm, success, funcion, id, idSeccion ) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    if(funcion == "añadir") {
      try {
        const res = await addReactivo(form, idSeccion);
        const resJson = await res?.json();
        if(resJson.mensaje =="se guardo correctamente"){
          console.log("Se creó un nuevo reactivo!");
          success();
        }
      } catch (err) {
        console.log(err);
      }
    } else if(funcion == "editar") {
      try {
        const res = await updateReactivo(form, id);
        const resJson = await res?.json();
        if(resJson.mensaje =="se guardo correctamente"){
          console.log("Se actualizó el reactivo!");
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
