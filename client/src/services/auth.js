import { http } from "./htpp";

export const signIn = async (form) => {
  try {
    const response = await fetch(`${http}auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: form.email,
        password: form.contrasenia,
      }),
    });

    const res = await response.json();
    if (res.token) {
      document.cookie = `token=${res.token}; max-age=86400; path=/; samesite=stric`;
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (form) => {
  try {
    const response = await fetch(`${http}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
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
    const token = document.cookie.replace("token=", "");
    const response = await fetch(`${http}auth/me`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": token },
      credentials: "include",
    });
    return response;
  } catch (error) {
    return;
  }
};

export const logOut = async () => {
  try {
    const token = document.cookie.replace("token=", "");
    const response = await fetch(`${http}auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": token },
      credentials: "include",
    });
    document.cookie = `token=; max-age=0`;
    return response;
  } catch (error) {
    console.log(error);
  }
};
