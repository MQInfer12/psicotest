import { http } from "./htpp";

export const signIn = async (form) => {
  console.log(form);
  try {
    const response = await fetch(`${http}auth/login`, {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        password: form.contrasenia,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (form) => {
  try {
    const response = await fetch(`${http}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "accept": "application/json",
    },
      credentials: "include",
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        password: form.contrasenia,
        genero: form.genero,
        edad: form.edad,
        id_sede: form.sede,
        id_rol: "1",
        estado: "1",
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch(`${http}auth/me`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const resJson = await response?.json();
    return resJson;
  } catch (error) {
    return;
  }
};

export const logOut = async () => {
  try {
    const response = await fetch(`${http}auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
