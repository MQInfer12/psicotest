import { http } from './htpp';

export const getSecciones = async () => {
  try {
    const response = await fetch(`${http}seccion`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSeccionesByTest = async (idTest) => {
  try {
    const response = await fetch(`${http}seccion/test/${idTest}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addSeccion = async (idTest) => {
  try {
    const response = await fetch(`${http}seccion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_test: idTest,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteSeccion = async (id) => {
  try {
    const response = await fetch(`${http}seccion/${id}`, {
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