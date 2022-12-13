import React from 'react'
import { useUserContext } from '../../context/userContext'
import { UseForm } from '../../hooks/useForm'
import { ErrorCss, FormContainer, PurpleButton } from '../../styles/globals/formularios'
import { initialForm, validationsForm } from '../../validations/blog'
import FormInputsText from '../globals/formInputsText'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import { addArticulo } from '../../services/articulo'

const ModalBlog = ({ funcion, call, actualizar, blog }) => {
  const { user } = useUserContext();
  const [errors, setErrors] = useState({ reseted: true });

  const { form, handleChange } = UseForm(
    blog ? {
      titulo: blog.titulo,
      descripcion: blog.descripcion,
      documento: blog.documento
    } : initialForm,
    validationsForm,
    call,
    actualizar,
    blog?.id,
    user.id
  )

  const data = [
    {
      name: "titulo",
      value: form.titulo,
      placeholder: "Titulo",
      error: errors.titulo,
      tipo: "text",
      disabled: false
    },
    {
      name: "descripcion",
      value: form.descripcion,
      placeholder: "Descripcion",
      error: errors.descripcion,
      tipo: "text",
      disabled: false
    },
  ]

  const handleSubmit = () => {
    setErrors(validationsForm(form))
  }

  const handleSend = async (formulario) => {
    const formData = new FormData();
    formData.append("id_docente", user.id);
    formData.append("titulo", formulario.titulo);
    formData.append("descripcion", formulario.descripcion);
    formData.append("documento", formulario.documento);
    const res = await addArticulo(formData);
    if(res.ok) {
      actualizar();
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      handleSend(form);
    }
  }, [errors])

  return (
    <FormContainer>
      <FormInputsText 
        data={data}
        handleChange={handleChange}
      />
      {errors.documento && <ErrorCss>{errors.documento}</ErrorCss>}
      <DivFile>
        <InputFile 
          accept=".pdf"
          type="file"
          name="documento"
          onChange={handleChange}
        />
        <PurpleButton>Subir documento</PurpleButton>
      </DivFile>
      <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
    </FormContainer>
  )
}

export default ModalBlog

const DivFile = styled.div`
  position: relative;
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;