export const initialForm = {
  from: "",
  to: "",
};
  
export const validationsForm = (form) => {
  let errors = {};

  if (!form.from.trim()) {
    errors.from = "Este campo es requerido";
  }
  if (!form.to.trim()) {
    errors.to = "Este campo es requerido";
  }

  return errors;
};
  