import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addGrupo } from "../services/grupo";

export const UseForm = ( initialForm, validateForm, success, id_docente ) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSend = async (form) => {
    try {
      const res = await addGrupo(form, id_docente);
      const resJson = await res?.json();
      if(resJson.mensaje =="se guardo correctamente"){
        console.log("Se creó un nuevo grupo!");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //CAMBIAR ERRORES
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
