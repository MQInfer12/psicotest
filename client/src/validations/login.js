export const initialForm = {
  email: "",
  contrasenia: "",
};

export const validationsForm = (form) => {
  let errors = {};
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if (!form.email.trim()) {
    errors.email = "El campo 'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Email' es incorrecto";
  }
  if (!form.contrasenia.trim()) {
    errors.contrasenia = "El campo 'Contraseña es requerido";
  }
  return errors;
};
