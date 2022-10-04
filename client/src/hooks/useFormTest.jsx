import { useState, useEffect } from "react";
import { addTest, updateTest } from "../services/test";

export const UseForm = ( initialForm, validateForm, success, funcion, id ) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    console.log(funcion);
    if(funcion == "añadir") {
      try {
        const res = await addTest(form);
        const resJson = await res?.json();
        if(resJson.mensaje =="se guardo correctamente"){
          console.log("Se creó un nuevo test!");
          success();
        }
      } catch (err) {
        console.log(err);
      }
    } else if(funcion == "editar") {
      try {
        const res = await updateTest(form, id);
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

  const handleFill = (test) => {
    const obj = {
      nombre: test.nombre,
      descripcion: test.descripcion,
      autor: "Admin",
      tiempo: test.tiempo
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
