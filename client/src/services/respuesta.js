import { http } from './htpp';

export const addRespuesta = async (form) => {
  try {
    const response = await fetch(`${http}respuesta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}