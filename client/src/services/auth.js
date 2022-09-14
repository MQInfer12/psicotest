import {http} from './htpp'

export const signIn = async (form) => {
    try {
      const response = await fetch(`${http}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // This here
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