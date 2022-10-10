import { useState, useEffect } from "react";
import { updateUser } from "../services/usuario";
import { getBase64 } from "../functions/base64encrypt";

export const UseForm = ( initialForm, validateForm, success, id) => {

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    try {
      const res = await updateUser(form, id);
      const resJson = await res?.json();
      if(resJson.mensaje =="se actualizo correctamente"){
        console.log("Se actualizó tu perfil!");
        success();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if(name == "perfil") {
      getBase64(e.target.files[0], (resultado) => {
        setForm({
          ...form,
          perfil: resultado,
        });
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFill = (user) => {
    console.log(user);
    setErrors({reseted: true});

    const obj = {
      nombre: user.nombre,
      edad: String(user.edad),
      genero: user.genero,
      sede: String(user.id_sede),
      perfil: user.perfil
    }

    setForm(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  const handleReset = () => {
    setForm({
      ...form,
      perfil: null,
    });
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
    handleFill,
    handleReset
  };
};
