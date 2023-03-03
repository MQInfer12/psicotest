import { http } from "../env";

export const updateConversiones = async (array) => {
  try {
    const response = await fetch(`${http}conversion/update`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        valores: array
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}