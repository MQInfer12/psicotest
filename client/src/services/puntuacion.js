import { http } from './htpp';

export const massUpdatePuntuaciones = async (puntuaciones) => {
  try {
    const response = await fetch(`${http}puntuacion/update`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        puntuaciones: puntuaciones
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}