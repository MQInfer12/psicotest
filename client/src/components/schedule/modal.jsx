import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UseForm } from "../../hooks/useFormSchedule";
import { initialForm, validationsForm } from "../../validations/schedule";
import FormInputsText from "../globals/formInputsText";
import { FormContainer, PurpleButton } from "../../styles/formularios";

const Modal = ({ hideModal, handlegetTime }) => {
  const { form, errors, handleChange, handleSubmit } = UseForm(
    initialForm,
    validationsForm,
    hideModal,
    handlegetTime,
  );

  const { user } = useContext(UserContext);
  
  const send = (e) => {
    form.id_docente = user.id;
    handleSubmit(e);
  };

  let data = [
    {
      name: "fecha",
      tipo: "text",
      value: form.fecha,
      err: errors.fecha,
      placeholder:"fecha - dd/mm/yy",
      disabled: false
    },
    {
      name: "hora_inicio",
      tipo: "text",
      value: form.hora_inicio,
      err: errors.hora_inicio,
      placeholder:"hora Inicio",
      disabled: false
    },
    {
      name: "hora_final",
      tipo: "text",
      value: form.hora_final,
      err: errors.hora_final,
      placeholder:"hora Final",
      disabled: false
    },
  ];

  return (
    <FormContainer>
      <FormInputsText data={data} handleChange={handleChange} />
      <PurpleButton onClick={(e) => send(e)}>Guardar</PurpleButton>
    </FormContainer>
  );
};

export default Modal;