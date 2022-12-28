import { http } from "./htpp";

export const addTest = async (form) => {
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

export const deleteProfessorAssigned = async (vec, id) => {
  try {
    const response = await fetch(`${http}test/deleteprofessorAssigning`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        objeto: vec,
        id_test: id,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
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

/* ======================= BENEFICIARY ============== */

export const addBenefToTest = async (obj, id_docente_test) => {
  try {
    const response = await fetch(`${http}test/AssigningVariosBenef`, {
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

export const deleteBenefAssigned = async (obj, id) => {
  try {
    const response = await fetch(`${http}test/deleteBenefAssigning`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        objeto: obj,
        id_docente_test: id,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};