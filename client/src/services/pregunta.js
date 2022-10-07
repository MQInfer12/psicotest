import { http } from './htpp';

export const getPreguntas = async () => {
  try {
    const response = await fetch(`${http}pregunta`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPreguntasBySeccion = async (idSeccion) => {
  try {
    const response = await fetch(`${http}pregunta/seccion/${idSeccion}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addPregunta = async (form, idSeccion) => {
  try {
    const response = await fetch(`${http}pregunta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_seccion: idSeccion,
        descripcion: form.descripcion
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updatePregunta = async (form, id) => {
  try {
    const response = await fetch(`${http}pregunta/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        id_seccion: form.id_seccion,
        descripcion: form.descripcion,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deletePregunta = async (id) => {
  try {
    const response = await fetch(`${http}pregunta/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json" 
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const massDestroy = async (ids) => {
  try {
    const objeto = Object.assign({}, ids);
    const response = await fetch(`${http}pregunta/destroy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_seccion: "",
        descripcion: "",
        objeto: objeto
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}