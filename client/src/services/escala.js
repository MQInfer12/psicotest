import { http } from "../env";

export const addEscala = async (form, idTest) => {
  try {
    const response = await fetch(`${http}escala`, {
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

export const updateEscala = async (form, id) => {
  try {
    const response = await fetch(`${http}escala/${id}`, {
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

export const deleteEscala = async (id) => {
  try {
    const response = await fetch(`${http}escala/${id}`, {
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