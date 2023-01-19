export const initialForm = {
  nombre: "",
  descripcion: "",
  tiempo: "",
};
  
export const validationsForm = (form) => {
  let errors = {};

  if (!form.nombre.trim()) {
    errors.nombre = "'Nombre' es requerido";
  }
  if (!form.descripcion.trim()) {
    errors.descripcion = "'Descripcion' es requerido";
  }
  if (!form.tiempo.trim()) {
    errors.tiempo = "'Tiempo' es requerido";
  }

  return errors;
};
  