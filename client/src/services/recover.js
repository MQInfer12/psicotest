import { http } from "../env";

export const sendRecoverEmail = async (form) => {
  try {
    const response = await fetch(`${http}recover`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(form),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const comprobeCode = async (form, id) => {
  let code = "";
  for(let key in form) {
    code += form[key];
  }
  try {
    const response = await fetch(`${http}recover/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        codigo: code
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const changePassword = async (form, id) => {
  try {
    const response = await fetch(`${http}recover/new/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        password: form.password
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}