export const initialFormEmail = {
  email: ""
};

export const initialFormCode = {
  num1: "",
  num2: "",
  num3: "",
  num4: "",
  num5: "",
  num6: ""
}

export const initialFormPassword = {
  password: "",
  passwordRepeat: ""
}

export const validationsFormEmail = (form) => {
  let errors = {};

  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

  if (!form.email.trim()) {
    errors.email = "'Email' es requerido";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "'Email' es incorrecto";
  }

  return errors;
};


export const validationsFormCode = (form) => {
  let errors = {};

  if (!form.num1.trim()) {
    errors.num1 = "'Num 1' es requerido";
  }
  if (!form.num2.trim()) {
    errors.num2 = "'Num 2' es requerido";
  }
  if (!form.num3.trim()) {
    errors.num3 = "'Num 3' es requerido";
  }
  if (!form.num4.trim()) {
    errors.num4 = "'Num 4' es requerido";
  }
  if (!form.num5.trim()) {
    errors.num5 = "'Num 5' es requerido";
  }
  if (!form.num6.trim()) {
    errors.num6 = "'Num 6' es requerido";
  }

  return errors;
}

export const validationsFormPassword = (form) => {
  let errors = {};

  if (!form.password.trim()) {
    errors.password = "'Contraseña' es requerida";
  }
  if (form.password.trim() != form.passwordRepeat.trim()) {
    errors.passwordRepeat = "No coinciden los campos";
  }

  return errors;
};