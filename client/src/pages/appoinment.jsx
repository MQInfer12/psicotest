import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import {
  getAppointByUser,
  getAllApoinments,
  scheduleAppoinment,
  cancelAppoinment,
} from "../services/cita";
const Appoinment = () => {
  const [appointmentByUser, setAppointmentByUser] = useState([]);
  const [appointmentAll, setAppointmentAll] = useState([]);
  const { user } = useContext(UserContext);
  const handleGetAll = async () => {
    const resp = await getAllApoinments();
    setAppointmentAll(resp);
  };

  const handleGetByUser = async () => {
    const resp = await getAppointByUser(user.id);
    setAppointmentByUser(resp);
  };

  const handleSchedule = async (idHorario) => {
    await scheduleAppoinment(idHorario, user.id);
    handleGetByUser();
    handleGetAll();
  };

  const handleCancelAppointment = async (idHorario, idCita) => {
    await cancelAppoinment(idHorario, idCita)
    handleGetAll();
    handleGetByUser();
  };

  useEffect(() => {
    handleGetAll();
    handleGetByUser();
  }, []);

  return (
    <div>
      <h2>Asignar cita</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora inicio</th>
            <th>Hora final</th>
            <th>email</th>
            <th>nombre</th>
            <th>Asignar</th>
          </tr>
        </thead>
        <tbody>
          {appointmentAll.map((v, i) => (
            <tr key={i}>
              <td>{v.fecha}</td>
              <td>{v.hora_inicio}</td>
              <td>{v.hora_final}</td>
              <td>{v.email}</td>
              <td>{v.nombre}</td>
              <td>
                <button onClick={() => handleSchedule(v.id)}>
                  Agendar Cita
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

      <h2>Citas asignadas</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora inicio</th>
            <th>Hora final</th>
            <th>email</th>
            <th>nombre</th>
          </tr>
        </thead>
        <tbody>
          {appointmentByUser.map((v, i) => (
            <tr key={i}>
              <td>{v.fecha}</td>
              <td>{v.hora_inicio}</td>
              <td>{v.hora_final}</td>
              <td>{v.email}</td>
              <td>{v.nombre}</td>
              <th>
                <button onClick={() => handleCancelAppointment(v.id_horario, v.id)}>
                  Cancelar Cita
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appoinment;
