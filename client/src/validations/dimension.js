export const validationsForm = (form) => {
  let errors = {};

  if (!form.constante.trim()) {
    errors.constante = "'Constante' es requerida";
  }

  return errors;
};
  