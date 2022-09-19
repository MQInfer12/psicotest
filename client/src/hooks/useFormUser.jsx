import { useState, useEffect } from "react";
import { addUser } from "../services/usuario";

export const UseForm = ( initialForm, validateForm, success ) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    try {
      const res = await addUser(form);
      const resJson = await res?.json();
      if(resJson.mensaje =="se guardo correctamente"){
        console.log("Se registró un nuevo usuario!");
        success();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
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

    //DA PASO AL USE EFFECT
    setEffects(true);
  }, [errors]);


  return {
    form,
    errors,
    handleChange,
    handleSubmit,
  };
};