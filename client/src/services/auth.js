import { doc, setDoc } from "firebase/firestore";
import { http } from "../env";
import { db } from "../firebase";

export const createFirebaseUser = async (nuevoUsuario) => {
  const { email, nombre, id, perfil } = nuevoUsuario;

  await setDoc(doc(db, "users", String(id)), {
    uid: id,
    name: nombre,
    email: email,
    rol: "1",
    perfil: perfil ? perfil : null,
  });
  await setDoc(doc(db, "userChats", String(id)), {});
  await setDoc(doc(db, "notifications", String(id)), {
    notification: [],
  });
}

export const signIn = async (form) => {
  try {
    const response = await fetch(`${http}auth/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
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

export const signInWithGoogle = async (user) => {
  try {
    const response = await fetch(`${http}auth/login/google`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        perfil: user.picture
      }),
    });

    const res = await response.json();
    if (res.token) {
      document.cookie = `token=${res.token}; max-age=86400; path=/; samesite=stric`;
    }
    console.log(res);
    if(res.newUser) {
      createFirebaseUser(res.user);
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
    document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    document.cookie = "g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
