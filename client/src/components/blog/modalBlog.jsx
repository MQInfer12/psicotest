import React from 'react'
import { useUserContext } from '../../context/userContext'
import { UseForm } from '../../hooks/useForm'
import { FormContainer, PurpleButton } from '../../styles/globals/formularios'
import { initialForm, validationsForm } from '../../validations/blog'
import FormInputsText from '../globals/formInputsText'
import { useState } from 'react'
import { useEffect } from 'react'
import InputFileDragDrop from '../globals/inputFileDragDrop'
import { http } from '../../services/htpp'
import ProgressBar from '../globals/progressBar'

const ModalBlog = ({ funcion, actualizar, blog }) => {
  const { user } = useUserContext();
  const [errors, setErrors] = useState({ reseted: true });
  const [progress, setProgress] = useState(0);

  const { form, handleChange } = UseForm(
    blog ? {
      titulo: blog.titulo,
      descripcion: blog.descripcion,
      documento: null
    } : initialForm,
    validationsForm,
    () => {},
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

  const sendArticulo = async () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      if(!blog) {
        formData.append("id_docente", user.id);
      }
      formData.append("titulo", form.titulo);
      formData.append("descripcion", form.descripcion);
      if(form.documento) {
        formData.append("documento", form.documento);
      }
  
      const req = new XMLHttpRequest();
      if(blog) {
        req.open("POST", `${http}articulo/update/${blog.id}`);
      } else {
        req.open('POST', `${http}articulo`);
      }
      req.upload.addEventListener('progress', (e) => {
        const percentage = (e.loaded / e.total) * 100;
        setProgress(percentage);
      });
  
      req.addEventListener('load', () => {
        resolve(req.status);
      });
  
      req.send(formData);
    })
  }

  const handleSend = async () => {
    const res = await sendArticulo();
    if(res === 201) {
      actualizar();
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      handleSend(form);
    }
  }, [errors])

  return (
    <>
      <FormContainer>
        <FormInputsText 
          data={data}
          handleChange={handleChange}
        />
        <InputFileDragDrop
          handleChange={handleChange}
          name="documento"
          types={["PDF"]}
          namePrev={form.documento?.name}
          error={errors.documento}
          text={blog && "Arrastra un archivo para sobrescribir el anterior"}
        />
        <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
      </FormContainer>
      <ProgressBar value={progress} />
    </>
  )
}

export default ModalBlog