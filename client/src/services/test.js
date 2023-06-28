import { http } from "../env";

export const addTest = async (form, id) => {
  try {
    const response = await fetch(`${http}test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        autor: id,
        tiempo: form.tiempo,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addProfessorToTest = async (obj, id_test) => {
  try {
    const response = await fetch(`${http}test/assignateProfessor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        objeto: obj,
        id_test: id_test,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTest = async (form, id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        tiempo: form.tiempo,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTest = async (id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const cambiarTipo = async (tipo, id) => {
  try {
    const response = await fetch(`${http}test/tipo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        tipo: tipo
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

/* ======================= DOCENTETESTS ============= */

// ESTE GET SE USA PARA OBTENER DATOS DEL DOCENTE TEST EN TESTSHARE
export const getDocenteTest = async (id) => {
  try {
    const response = await fetch(`${http}test/ids/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addCollaborator = async (form, id_test) => {
  try {
    const response = await fetch(`${http}test/collab/${id_test}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(form)
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

/* ======================= BENEFICIARY ============== */

export const addBenefToTest = async (obj, id_docente_test) => {
  try {
    const response = await fetch(`${http}test/assigning/benef`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        objeto: obj,
        id_docente_test: id_docente_test,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};