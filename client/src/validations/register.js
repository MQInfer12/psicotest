export const initialForm = {
  email: "",
  contrasenia: "",
  contraseniaRepeat: "",
  edad: "",
  nombre: "",
  genero: "",
  sede: "",
};

export const validationsForm = (form) => {
  let errors = {};
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexNumber = /^[0-9]+$/;
  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }

  if (!form.contrasenia.trim()) {
    errors.contrasenia = "El campo 'Contraseña es requerido";
  }

  if (form.contrasenia.trim() != form.contraseniaRepeat.trim()) {
    errors.contraseniaRepeat = "no coinciden los campos";
  }

  if (!form.edad.trim()) {
    errors.edad = "El campo 'edad' es requerido";
  }
  if (!regexNumber.test(form.edad.trim())) {
    errors.edad = "El campo 'edad' sólo acepta numeros";
  }
  if (!form.nombre.trim()) {
    errors.nombre = "El campo 'nombre' es requerido";
  }
  if (!regexName.test(form.nombre.trim())) {
    errors.nombre = "El campo 'Nombre' sólo acepta letras y espacios en blanco";
  }
  if(!form.genero.trim()){
    errors.genero = "El campo 'genero' es rquerido";
  }
  if(!form.sede.trim()){
    errors.sede = "El campo 'sede' es rquerido";
  }
  return errors;
};
