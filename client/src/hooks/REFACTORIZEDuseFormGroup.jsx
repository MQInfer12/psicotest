import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addGrupo, updateGrupo } from "../services/grupo";

export const UseForm = ( initialForm, validateForm, success, funcion, id, id_docente ) => {

  const [form, setForm] = useState(initialForm);
  //USESTATE DEL TAMAÑO DEL STRING//
  const [sizeTitle, setSizeTitle] = useState(0);
  //USESTATE DEL TAMAÑO DEL STRING//
  const [errors, setErrors] = useState({});

  const handleSend = async (form) => {
    if(funcion == "añadir") {
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
    } else if(funcion == "editar") {
      try {
        const res = await updateGrupo(form, id);
        const resJson = await res?.json();
        if(resJson.mensaje =="se actualizo correctamente"){
          console.log("Se actualizó el grupo!");
          success();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    //COMPROBAR STRING E IR ACTUALIZANDO EL TAMAÑO//
    if(e.target.name == "titulo") {
      if(e.target.value.length > 22) {
        e.target.value = e.target.value.slice(0, 21);
        return;
      }
      setSizeTitle(e.target.value.length);
    }
    //COMPROBAR STRING E IR ACTUALIZANDO EL TAMAÑO//

    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFill = (group) => {
    //CARGAR TAMAÑO DEL STRING AL EDITAR//
    setSizeTitle(group.titulo.length);
    //CARGAR TAMAÑO DEL STRING AL EDITAR//

    const obj = {
      titulo: group.titulo,
      descripcion: group.descripcion,
      id_docente: id_docente
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
    sizeTitle,
    handleChange,
    handleSubmit,
    handleFill
  };
};
