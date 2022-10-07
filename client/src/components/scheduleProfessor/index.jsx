import React, { useContext, useEffect, useState } from "react";
import ModalSchedule from "./modal";
import Modal from "../globals/modal";
import { getTime, deleteHorario } from "../../services/horario";
import { UserContext } from "../../context/userContext";
const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [dataTime, setDataTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const hideModal = () => {
    setShowForm(false);
  };

  const handlegetTime = async () => {
    const res = await getTime(user.id);
    setDataTime(res);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteHorario(id);
    handlegetTime();
  };

  useEffect(() => {
    handlegetTime();
  }, []);

  return (
    <>
      <button onClick={() => setShowForm(true)}>Agregar horario</button>
      {showForm && (
        <Modal cerrar={hideModal} titulo="Añadir Horario">
          <ModalSchedule hideModal={hideModal} handlegetTime={handlegetTime} />
        </Modal>
      )}
      {!loading && (
        <>
          <p>listar horarios</p>

          <table>
            <thead>
              <tr>
                <th>fecha</th>
                <th>hora_inicio</th>
                <th>hora_final</th>
                <th>disponible</th>
                <th>email</th>
                <th>nombre</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody style={{textAlign:"center"}}>
              {dataTime.map((v, i) => (
                <tr key={i}>
                  <td>{v.fecha}</td>
                  <td>{v.hora_inicio}</td>
                  <td>{v.hora_final}</td>
                  <td>{v.disponible ? "si" : "no"}</td>
                  <td>{v.email}</td>
                  <td>{v.nombre}</td>
                  <td>
                    <button onClick={() => handleDelete(v.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Index;
