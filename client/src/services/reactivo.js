import { http } from './htpp';

export const addReactivo = async (form, idSeccion) => {
  try {
    const response = await fetch(`${http}reactivo`, {
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

export const updateReactivo = async (form, id) => {
  try {
    const response = await fetch(`${http}reactivo/${id}`, {
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

export const deleteReactivo = async (id) => {
  try {
    const response = await fetch(`${http}reactivo/${id}`, {
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