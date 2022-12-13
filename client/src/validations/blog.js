export const initialForm = {
  titulo: "",
  descripcion: "",
  documento: ""
};
  
export const validationsForm = (form) => {
  let errors = {};

  if (!form.titulo.trim()) {
    errors.titulo = "'Título' es requerido";
  }
  if (!form.descripcion.trim()) {
    errors.descripcion = "'Descripción' es requerido";
  }
  if (form.documento == "") {
    errors.documento = "'Documento' es requerido";
  }

  return errors;
};