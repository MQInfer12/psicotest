export const initialForm = {
  email: "",
  contrasenia: "",
};

export const validationsForm = (form) => {
  let errors = {};

  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if (!form.email.trim()) {
    errors.email = "'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "'Email' es incorrecto";
  }

  if (!form.contrasenia.trim()) {
    errors.contrasenia = "'Contraseña' es requerida";
  }

  return errors;
};
