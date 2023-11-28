import { http } from "../env";

export const updateRespuesta = async (form, id) => {
  try {
    const response = await fetch(`${http}respuesta/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addRespuesta = async (form) => {
  try {
    const response = await fetch(`${http}respuesta`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getFullRespuesta = async ({ id }) => {
  try {
    const response = await fetch(`${http}respuesta/full/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const generateInterpretation = async (id, text) => {
  try {
    const response = await fetch(`${http}respuesta/interpretation/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        text: text
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const saveInterpretation = async (id, text) => {
  try {
    const response = await fetch(`${http}respuesta/interpretation/save/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        interpretation: text
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}