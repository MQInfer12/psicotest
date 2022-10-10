export const initialForm = {
  nombre: "",
  edad: "",
  genero: "",
  sede: "",
  perfil: ""
};

export const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexNumber = /^[0-9]+$/;

  if (!form.edad.trim()) {
    errors.edad = "'Edad' es requerido";
  }
  if (!regexNumber.test(form.edad.trim())) {
    errors.edad = "'Edad' sólo acepta numeros";
  }

  if (!form.nombre.trim()) {
    errors.nombre = "'Nombre' es requerido";
  }
  if (!regexName.test(form.nombre.trim())) {
    errors.nombre = "'Nombre' solo acepta letras y espacios";
  }

  if(!form.genero.trim() || form.genero == 0){
    errors.genero = "'Genero' es requerido";
  }

  if(!form.sede.trim() || form.sede == 0){
    errors.sede = "'Sede' es requerido";
  }
  
  return errors;
};
