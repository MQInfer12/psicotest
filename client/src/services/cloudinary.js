import { cloudinaryHttp } from "./htpp";

export const uploadImage = async (formData) => {
  try {
    const response = await fetch(`${cloudinaryHttp}upload`, {
      method: "POST",
      headers: { 
        "accept": "application/json", 
      },
      body: formData
    });
    return response;
  } catch (error) {
      console.log(error);
  }
};