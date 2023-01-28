import { http } from './htpp';

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

export const updateSeccion = async (form, id) => {
  try {
    const response = await fetch(`${http}seccion/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        instruccion: form.instruccion
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

export const changeMultimarcado = async (id) => {
  try {
    const response = await fetch(`${http}seccion/multimarcado/${id}`, {
      method: "PUT",
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

export const changeVacio = async (id) => {
  try {
    const response = await fetch(`${http}seccion/vacio/${id}`, {
      method: "PUT",
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

export const changeOrden = async (ordenes) => {
  try {
    const response = await fetch(`${http}seccion/change/orden`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json" 
      },
      body: JSON.stringify({
        ordenes: ordenes
      })
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}