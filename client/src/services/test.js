import { http } from "./htpp";

export const getTests = async () => {
  try {
    const response = await fetch(`${http}test`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getTestsToProfessor = async (id) => {
  try {
    const response = await fetch(`${http}test/testToprofessor/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getBeneficiaryAssign = async (id) => {
  try {
    const response = await fetch(`${http}test/benefAssigning/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getProfessorTests = async (id) => {
  try {
    const response = await fetch(`${http}test/professor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

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
    const resJson = await response.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
};

export const getTest = async (id) => {
  try {
    const response = await fetch(`${http}test/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getFullTest = async (id) => {
  try {
    const response = await fetch(`${http}test/full/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

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

export const getProfessorNotAssigned = async (id) => {
  try {
    const response = await fetch(`${http}test/professorNotAssigning/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getProfessorAssigned = async (id) => {
  try {
    const response = await fetch(`${http}test/professorAssigning/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
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
