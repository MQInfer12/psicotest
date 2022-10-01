import { http } from "./htpp";

export const getGruposDocente = async (id_docente) => {
  try {
    const response = await fetch(`${http}grupo/docente/${id_docente}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
    });
    return response;
  } catch (error) {
      console.log(error);
  }
};

export const getGrupos = async () => {
  try {
    const response = await fetch(`${http}grupo`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },  
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addGrupo = async (form, id_docente) => {
  try {
    const response = await fetch(`${http}grupo`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        titulo: form.titulo,
        descripcion: form.descripcion,
        id_docente: id_docente,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updateGrupo = async (form, id) => {
  try {
    const response = await fetch(`${http}grupo/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        titulo: form.titulo,
        descripcion: form.descripcion,
        id_docente: form.id_docente,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const ableGrupo = async (id) => {
  try {
    const response = await fetch(`${http}grupo/able/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      "accept": "application/json", },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}