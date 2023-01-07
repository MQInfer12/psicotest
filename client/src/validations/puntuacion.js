export const validationsForm = (form) => {
  let errors = {};

  if (!form.predeterminado.trim()) {
    errors.predeterminado = "'Puntuación asignada' es requerida";
  }

  return errors;
};
  