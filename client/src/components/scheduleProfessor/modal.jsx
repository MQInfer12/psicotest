import React, { useContext } from "react";

import { UserContext } from "../../context/userContext";
import { UseForm } from "../../hooks/useFormSchedule";
import { initialForm, validationsForm } from "../../validations/schedule";
const Modal = ({ hideModal }) => {
  const { form, errors, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    hideModal
  );
  const { user } = useContext(UserContext);
  const send = (e) => {
    form.id_docente = user.id;
    handleSubmit(e);
  };
  let data = [
    {
      name: "fecha",
      value: form.fecha,
      err: errors.fecha,
    },
    {
      name: "hora_inicio",
      value: form.hora_inicio,
      err: errors.hora_inicio,
    },
    {
      name: "hora_final",
      value: form.hora_final,
      err: errors.hora_final,
    },
  ];
  return (
    <div>
      {data.map((v, i) => (
        <div key={i}>
          <input
            type="text"
            name={v.name}
            value={v.value}
            onChange={handleChange}
          />
          {v.err && <p>{v.err}</p>}
        </div>
      ))}
      <button onClick={(e) => send(e)}>Guardar</button>
    </div>
  );
};

export default Modal;
