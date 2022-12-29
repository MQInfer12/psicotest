export const validationsForm = (form) => {
  let errors = {};

  console.log(form.predeterminado);
  if (!form.predeterminado.trim()) {
    errors.predeterminado = "'Puntuación asignada' es requerida";
  }

  return errors;
};
  