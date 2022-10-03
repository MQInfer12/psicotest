import { useState, useContext, useEffect } from "react";
import { addHorario } from '../services/horario';
import { getProfile } from "../services/auth";
import { UserContext } from "../context/userContext";

export const UseForm = ( initialForm, validateForm, hideModal ) => {

  const {user, setUser} = useContext(UserContext);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});


  const handleSend = async (form) => {
    try {
      const res = await addHorario(form);
      const resJson = await res?.json();

      if(resJson.message =="se guardo correctamente"){
        hideModal()
      } else {
        alert(resJson.error)
      };
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
