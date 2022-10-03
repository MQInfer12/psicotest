import React from "react";
import { UseForm } from "../../hooks/useFormSchedule";
import { initialForm, validationsForm } from "../../validations/schedule";
const Modal = ({ hideModal }) => {
  const { form, errors, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    hideModal
  );
  const send = (e) => {
    handleSubmit(e);
  };
  return (
    <div>
      <input
        type="text"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
      />
      {errors.fecha && <p>{errors.fecha}</p>}

      <input
        type="text"
        name="hora_inicio"
        value={form.hora_inicio}
        onChange={handleChange}
      />
      {errors.hora_inicio && <p>{errors.hora_inicio}</p>}

      <input
        type="text"
        name="hora_final"
        value={form.hora_final}
        onChange={handleChange}
      />
      {errors.hora_final && <p>{errors.hora_final}</p>}

      <button onClick={(e) => send(e)}>Guardar</button>
    </div>
  );
};

export default Modal;
