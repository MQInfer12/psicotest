export const initialForm = {
  titulo: "",
  descripcion: ""
};
  
export const validationsForm = (form) => {
  let errors = {};

  if (!form.titulo.trim()) {
      errors.titulo = "'Titulo' es requerido";
  }
  if (!form.descripcion.trim()) {
      errors.descripcion = "'Descripción' es requerido";
  }

  return errors;
};