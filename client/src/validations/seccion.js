export const validationsForm = (form) => {
  let errors = {};

  if (!form.nombre.trim()) {
    errors.nombre = "'Nombre' es requerido";
  }

  return errors;
};
  