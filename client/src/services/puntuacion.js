import { http } from './htpp';

export const getPuntuacionesByReactivos = async (idReactivos) => {
  try {
    const reactivos = Object.assign({}, idReactivos);
    const response = await fetch(`${http}puntuacion/reactivo`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({
        reactivos: reactivos
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};