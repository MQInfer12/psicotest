import { http } from "../env";

export const addArticulo = async (form) => {
  try {
    const response = await fetch(`${http}articulo`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: form,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const pdfIndividual = async (id) => {
  const res1 = await fetch(`${http}articulo/documento/${id}`);
  const data = await res1.blob();
  var url = window.URL.createObjectURL(data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "file";
  anchor.click();
  window.URL.revokeObjectURL(url);
};

export const changeDestacado = async (id) => {
  try {
    const response = await fetch(`${http}articulo/destacado/${id}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const deleteArticulo = async (id) => {
  try {
    const response = await fetch(`${http}articulo/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}