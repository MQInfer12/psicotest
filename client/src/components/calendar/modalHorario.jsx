import React from "react";
import styled from "styled-components";
import { DangerButton, FormContainer, PurpleButton } from "../../styles/globals/formularios";
import FormInputsText from "../globals/formInputsText";
import { UseForm } from "../../hooks/useForm";
import { validationsForm } from "../../validations/schedule";
import { deleteHorario } from "../../services/horario";

const ModalHorario = ({ funcion, call, actualizar, horario, fecha, id_docente }) => {
  const {
    form,
    errors,
    handleChange,
    handleSubmit
  } = UseForm(
    horario ? {
      fecha: horario.fecha,
      hora_inicio: horario.hora_inicio,
      hora_final: horario.hora_final
    } : {
      fecha: fecha,
      hora_inicio: "",
      hora_final: ""
    },
    validationsForm,
    call,
    actualizar,
    horario?.id,
    id_docente
  );
  
  let data = [
    {
      name: "fecha",
      tipo: "text",
      value: form.fecha,
      error: errors.fecha,
      placeholder:"fecha - mm/dd/yyyy",
      disabled: false,
    },
    {
      name: "hora_inicio",
      tipo: "time",
      value: form.hora_inicio,
      error: errors.hora_inicio,
      placeholder:"Hora inicio",
      disabled: false,
      center: true
    },
    {
      name: "hora_final",
      tipo: "time",
      value: form.hora_final,
      error: errors.hora_final,
      placeholder:"Hora final",
      disabled: false,
      center: true
    },
  ];

  const handleDelete = async () => {
    const res = await deleteHorario(horario.id);
    const resJson = await res?.json();
    if(resJson) {
      actualizar();
    }
  };

  return (
    <FormContainer>
      <FormInputsText
        handleChange={handleChange}
        data={data}
      />
      <DoubleButton>
        <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
        {
          horario &&
          <DangerButton onClick={handleDelete}>Eliminar</DangerButton>
        }
      </DoubleButton>
    </FormContainer>
  )
}

export default ModalHorario;

const DoubleButton = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  & > button {
    width: 100%;
  }
`;