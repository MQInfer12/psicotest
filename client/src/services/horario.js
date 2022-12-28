import { http } from "./htpp";

export const addHorario = async (form, id_docente) => {
  try {
    const response = await fetch(`${http}horario`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: form.fecha,
        hora_inicio:form.hora_inicio,
        hora_final:form.hora_final,
        id_docente: id_docente,
      }),
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const updateHorario = async (form, id) => {
  try {
    const response = await fetch(`${http}horario/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: form.fecha,
        hora_inicio:form.hora_inicio,
        hora_final:form.hora_final
      }),
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}

export const deleteHorario = async (id) => {
  try {
    const response = await fetch(`${http}horario/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(false)
    });
  
    return response;
  } catch (err) {
    console.error(err);
  }
};
