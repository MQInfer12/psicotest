export const initialForm = {
  descripcion: ""
};
  
export const validationsForm = (form) => {
  let errors = {};

  if (!form.descripcion.trim()) {
    errors.descripcion = "'Descripcion' es requerido";
  }

  return errors;
};
  