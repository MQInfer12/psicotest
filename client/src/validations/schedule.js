export const initialForm = {
  fecha: "",
  hora_inicio: "",
  hora_final: "",
  id_docente: "",
};

export const validationsForm = (form) => {
  var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

  var regexTime = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/;

  let errors = {};
  if (!form.fecha.trim()) {
    errors.fecha = "'Fecha' es requerido";
  } 
  else if (!regexDate.test(form.fecha.trim())) {
    errors.fecha = "'Fecha' esta en formato incorrecto";
  }
  if (!form.hora_inicio.trim()) {
    errors.hora_inicio = "'Hora inicio' es requerido";
  } else if (!regexTime.test(form.hora_inicio.trim())) {
    errors.hora_inicio = "'Hora inicio' esta en formato incorrecto";
  }
  if (!form.hora_final.trim()) {
    errors.hora_final = "'Hora final' es requerido";
  } else if (!regexTime.test(form.hora_final.trim())) {
    errors.hora_final = "'Hora final' esta en formato incorrecto";
  }

  return errors;
};
