import React from 'react'
import { useUserContext } from '../../context/userContext'
import { useModal } from '../../hooks/useModal';
import { changeDestacado, deleteArticulo } from '../../services/articulo';
import { DangerIconButton, WhiteIconButton } from '../../styles/globals/formularios';
import { CardButtonContainer } from '../../styles/pages/blog';
import SureModal from '../globals/sureModal';
import ModalBlog from './modalBlog';

const CardButtons = ({ article, llenarArticulos }) => {
  const { user } = useUserContext();

  const destacar = async () => {
    const res = await changeDestacado(article.id);
    if(res.ok) {
      llenarArticulos();
    }
  }

  const eliminarArticulo = async () => {
    const res = await deleteArticulo(article.id);
    if(res.ok) {
      llenarArticulos();
    }
  }

  const { openModal: openEdit , closeModal: closeEdit } = useModal(
    "Editar artículo",
    <ModalBlog 
      actualizar={() => {
        llenarArticulos();
        closeEdit();
      }}
      blog={article}
      funcion="Editar"
    />
  )

  const { openModal, closeModal } = useModal(
    "Eliminar artículo",
    <SureModal 
      cerrar={() => closeModal()}
      sure={eliminarArticulo}
      text="Se eliminará el artículo permanentemente"
    />
  )

  return (
    <CardButtonContainer>
      <div>
        {
          user.id_rol === 3 && 
          <WhiteIconButton title={article.destacado ? "Quitar artículo de destacados" : "Destacar artículo"} onClick={destacar}>
            {article.destacado ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
          </WhiteIconButton>
        }
        {
          article.id_docente === user.id &&
          <WhiteIconButton title="Editar artículo" onClick={openEdit}>
            <i className="fa-solid fa-pencil"></i>
          </WhiteIconButton>
        }
        {
          (user.id_rol !== 1 && article.id_docente === user.id) &&
          <DangerIconButton title="Eliminar artículo" onClick={openModal}>
            <i className="fa-solid fa-trash-can"></i>
          </DangerIconButton>
        }
      </div>
    </CardButtonContainer>
  )
}

export default CardButtons