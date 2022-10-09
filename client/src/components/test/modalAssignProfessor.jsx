import React, { useEffect, useState } from "react";
import { getProfessor } from "../../services/usuario";
const ModalAssignProfessor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleGetData = async () => {
    const res = await getProfessor();
    setData(res);
    setLoading(false)
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>cargando</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>User</th>
              <th>Estado</th>
              <th>Sede</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((v, i) => (
              <tr key={i}>
                <td>{v.email}</td>
                <td>{v.nombre_user}</td>
                <td>{v.estado ? "En funciones" : "En descanso"}</td>
                <td>{v.nombre_sede}</td>
                <td>
                  <button>Asignar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModalAssignProfessor;
