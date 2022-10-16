import { http } from "./htpp";

export const getTime = async (id) => {
  try {
    const response = await fetch(`${http}horario/show/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
}

export const getTimeWithWhoHaveDate = async (id) => {
  try {
    const response = await fetch(`${http}horario/showWho/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
}


export const addHorario = async (form, id_docente) => {
  try {
    const response = await fetch(`${http}horario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
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
