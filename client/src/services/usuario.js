import {http} from './htpp';

export const getUsers = async () => {
  try {
    const response = await fetch(`${http}user`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (form) => {
  try {
    const response = await fetch(`${http}user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        password: form.contrasenia,
        genero: form.genero,
        edad: form.edad,
        id_sede: form.sede,
        id_rol: form.rol,
        estado: "1"
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getUser = async (id) => {
  try {
    const response = await fetch(`${http}user/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (form, id) => {
  try {
    const response = await fetch(`${http}user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        genero: form.genero,
        edad: form.edad,
        id_sede: form.sede,
        id_rol: form.rol
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}