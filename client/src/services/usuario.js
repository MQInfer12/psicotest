import { http } from './htpp';

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

export const updateUser = async (form, id) => {
  try {
    const response = await fetch(`${http}user/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "accept": "application/json", 
      },
      body: JSON.stringify({
        perfil: form.perfil,
        nombre: form.nombre,
        genero: form.genero,
        edad: form.edad,
        id_sede: form.sede,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const ableUser = async (id) => {
  try {
    const response = await fetch(`${http}user/able/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      "accept": "application/json", },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${http}user/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json", 
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}