import { http } from "./htpp";

export const getAppointByUser = async (id) => {
  try {
    const response = await fetch(`${http}cita/schedule/${id}`, {
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

export const getAllApoinments = async (email) => {
  try {
    const response = await fetch(`${http}cita/allschedule/${email}`, {
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

export const scheduleAppoinment = async (idHorario, idUsuario) => {
  try {
    const response = await fetch(`${http}cita/schedule/${idHorario}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuario: idUsuario,
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

export const cancelAppoinment = async (idHorario, idCita) => {
  try {
    const response = await fetch(
      `${http}cita/allschedule/${idHorario}/${idCita}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: 8,
        }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
