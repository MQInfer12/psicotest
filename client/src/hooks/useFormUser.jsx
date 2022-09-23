import { useState, useEffect } from "react";
import { addUser, updateUser } from "../services/usuario";

export const UseForm = ( initialForm, validateForm, success, funcion, id_user ) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    if(funcion == "añadir") {
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
    } else if(funcion == "editar") {
      try {
        const res = await updateUser(form, id_user);
        const resJson = await res?.json();
        if(resJson.mensaje =="se actualizo correctamente"){
          console.log("Se actualizó el usuario!");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  const handleUser = (user) => {
    const obj = {
      nombre: user.nombreUser,
      email: user.email,
      edad: String(user.edad),
      contrasenia: "password",
      genero: user.genero,
      sede: String(user.id_sede),
      rol: String(user.id_rol),
    }

    setForm(obj);
  }

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
    handleUser
  };
};