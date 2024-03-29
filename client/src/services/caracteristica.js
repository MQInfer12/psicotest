import { http } from "../env";

export const addCaracteristica = async (form, id_test) => {
  try {
    const response = await fetch(`${http}caracteristica`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        accept: "application/json", 
      },
      body: JSON.stringify({
        titulo: form.titulo,
        descripcion: form.descripcion,
        id_test: id_test,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updateCaracteristica = async (form, id) => {
  try {
    const response = await fetch(`${http}caracteristica/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        titulo: form.titulo,
        descripcion: form.descripcion
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteCaracteristica = async (id) => {
  try {
    const response = await fetch(`${http}caracteristica/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}