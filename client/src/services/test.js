import { http } from "./htpp";

export const getTests = async () => {
  try {
    const response = await fetch(`${http}test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfessorTests = async (id) => {
  try {
    const response = await fetch(`${http}test/professor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

export const addTest = async (form) => {
  try {
    const response = await fetch(`${http}test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        tiempo: form.tiempo,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addProfessorToTest = async (obj, id_test) => {
  try {
    const response = await fetch(`${http}test/assignateProfessor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        objeto: obj,
        id_test: id_test,
      }),
    });
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

export const getTest = async (id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTest = async (form, id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        tiempo: form.tiempo,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTest = async (id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
