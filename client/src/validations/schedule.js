export const initialForm = {
  fecha: "",
  hora_inicio: "",
  hora_final: "",
  id_docente: "",
};

export const validationsForm = (form) => {
  var regexDate =
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g;

  var regexTime = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/;

  let errors = {};
  if (!form.fecha.trim()) {
    errors.fecha = "'Fecha' es requerido";
  } else if (!regexDate.test(form.fecha.trim())) {
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
