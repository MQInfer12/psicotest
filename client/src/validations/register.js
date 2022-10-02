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
    errors.email = "'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "'Email' es incorrecto";
  }

  if (!form.contrasenia.trim()) {
    errors.contrasenia = "'Contraseña es requerido";
    }
    if (form.contrasenia.trim() != form.contraseniaRepeat.trim()) {
    errors.contraseniaRepeat = "No coinciden los campos";
  }

  if (!form.edad.trim()) {
    errors.edad = "'Edad' es requerido";
  } else if (!regexNumber.test(form.edad.trim())) {
    errors.edad = "'Edad' sólo acepta numeros";
  }

  if (!form.nombre.trim()) {
    errors.nombre = "'Nombre' es requerido";
  } else if (!regexName.test(form.nombre.trim())) {
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
