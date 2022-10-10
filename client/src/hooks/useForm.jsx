import { useState, useEffect } from "react";

export const UseForm = (initialForm, validateForm, APICall, success, primaryId, foreignId) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({reseted: true});

  //CONVERTIR IMAGENES A BASE 64
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      return console.log('Error: ', error);
    };
  }

  //ENVIAR PETICION
  const handleSend = async (form) => {
    try {
      let res;
      if(primaryId) { //LLAMAR A LA API PARA EDITAR
        res = await APICall(form, primaryId);
      } else if(foreignId) { //LLAMAR A LA API PARA AÑADIR UN DATO CON LLAVE FORANEA
        res = await APICall(form, foreignId);
      } else { //LLAMAR A LA API PARA AÑADIR
        res = await APICall(form);
      }

      if(res.status == 201) { //ESTADO DE GUARDADO O EDITADO
        console.log("¡Petición correcta!");
        success();
      } else if(res.status == 200) { //ESTADO DE LOGEADO
        console.log("¡Logeado con éxito!");
        success();
      } else if(res.status == 401) { //NO AUTORIZADO
        console.log("¡Correo o contraseña incorrectos!");
        alert("¡Correo o contraseña incorrectos!");
      } else if(res.status == 403) {
        console.log("¡No se puede ingresar a esta cuenta!");
        alert("¡No se puede ingresar a esta cuenta!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //IR CAMBIANDO EL FORM
  const handleChange = (e) => {
    const { name, value } = e.target;

    //SI EL INPUT ES DE TIPO FILE CONVERTIR A BASE64
    if(e.target.type == 'file') {
      getBase64(e.target.files[0], (resultado) => {
        setForm({
          ...form,
          [name]: resultado,
        });
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  //COMPROBAR ERRORES PRIMERO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  //RESETEAR A POR DEFECTO
  const handleReset = () => {
    setForm(initialForm);
    setErrors({reseted: true});
  }

  //ELIMINAR IMAGEN
  const handleResetImg = (key) => {
    setForm({
      ...form,
      [key]: null,
    });
  }

  //LUEGO EJECUTAR SEND SI NO HAY ERRORES
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    if(effects) {
      if (Object.keys(errors).length === 0) {
        handleSend(form);
      }
    }
    setEffects(true);
  }, [errors]);

  //RETORNAR FUNCIONES Y ESTADOS
  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
    handleResetImg
  };
}