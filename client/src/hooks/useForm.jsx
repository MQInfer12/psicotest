import { useState, useEffect } from "react";
import { cloudinaryHttp } from "../services/htpp";
import { validarInputFile } from "../utilities/validarInputFile";

export const UseForm = (
  initialForm,
  validateForm,
  APICall,
  success,
  primaryId,
  foreignId
) => {
  const [form, setForm] = useState(initialForm);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({ reseted: true });
  const [loading, setLoading] = useState(false);
  
  const sendCloudinary = async (val) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", val);
      formData.append("upload_preset", "la8fhiin");
  
      const req = new XMLHttpRequest();
      req.open('POST', `${cloudinaryHttp}upload`);
      req.upload.addEventListener('progress', (e) => {
        const percentage = (e.loaded / e.total) * 100;
        setProgress(percentage);
      });
  
      req.addEventListener('load', () => {
        resolve(req.response);
      });
  
      req.send(formData);
    })
  }

  //ENVIAR PETICION
  const handleSend = async (form) => {
    setLoading(true);

    try {
      for(let key in form) {
        if(form[key]?.type === "image/jpeg" || form[key]?.type === "image/png") {
          const resCloudinary = await sendCloudinary(form[key]);
          const resJsonCloudinary = JSON.parse(resCloudinary);
          form[key] = resJsonCloudinary.public_id;
        }
      }

      let res;
      if (primaryId) {
        //LLAMAR A LA API PARA EDITAR
        res = await APICall(form, primaryId);
      } else if (foreignId) {
        //LLAMAR A LA API PARA AÑADIR UN DATO CON LLAVE FORANEA
        res = await APICall(form, foreignId);
      } else {
        //LLAMAR A LA API PARA AÑADIR
        res = await APICall(form);
      }

      if (res.status == 201) {
        //ESTADO DE GUARDADO O EDITADO
        console.log("¡Petición correcta!");
        setProgress(100);
        const resJson = await res?.json();
        success(resJson);
      } else if (res.status == 200) {
        //ESTADO DE LOGEADO
        console.log("¡Logeado con éxito!");
        return success();
      } else if (res.status == 209) {
        //ESTADO DE REGISTRO
        const resJson = await res?.json();
        success(resJson);
      } else if (res.status == 401) {
        //NO AUTORIZADO
        console.log("¡Correo o contraseña incorrectos!");
        alert("¡Correo o contraseña incorrectos!");
      } else if (res.status == 403) {
        console.log("¡No se puede ingresar a esta cuenta!");
        alert("¡No se puede ingresar a esta cuenta!");
      }

      setLoading(false);
      setProgress(0);
    } catch (err) {
      console.log(err);
    }
  };

  //IR CAMBIANDO EL FORM
  const handleChange = async (e) => {
    //SI EL INPUT ES DE TIPO FILE VALIDAR Y CONVERTIR A BASE64
    if (e.target.type == "file") {
      if (validarInputFile(e)) return;
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
      return;
    }

    const { name, value } = e.target;
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
    setErrors({ reseted: true });
  };

  //ELIMINAR IMAGEN
  const handleResetImg = (key) => {
    setForm({
      ...form,
      [key]: null,
    });
  };

  //LUEGO EJECUTAR SEND SI NO HAY ERRORES
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    if (effects) {
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
    loading,
    progress,
    handleChange,
    handleSubmit,
    handleReset,
    handleResetImg
  };
};
