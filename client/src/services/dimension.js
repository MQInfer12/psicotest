import { http } from "../env";

export const addDimension = async (form, idTest) => {
  try {
    const response = await fetch(`${http}dimension`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id_test: idTest,
        descripcion: form.descripcion
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updateDimension = async (form, id) => {
  try {
    const response = await fetch(`${http}dimension/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        descripcion: form.descripcion
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteDimension = async (id) => {
  try {
    const response = await fetch(`${http}dimension/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updatePreguntaDimensions = async (preguntas, id) => {
  try {
    const response = await fetch(`${http}pregunta/dimension/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        preguntas: preguntas
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const changeConstante = async (form, id) => {
  try {
    const response = await fetch(`${http}dimension/constante/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        constante: form.constante
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}