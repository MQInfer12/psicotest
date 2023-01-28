import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext'
import { updateConversiones } from '../../../services/conversion';
import { DangerIconButton } from '../../../styles/globals/formularios'

const EditarConversionesButton = ({ dimension, valores }) => {
  const { setDimensiones, setSaveConversiones, saveConversiones } = useTestCreatorContext();

  const handleSave = async () => {
    const array = [];
    valores.forEach(valor => {
      valor.conversiones.forEach(conversion => {
        const apiObject = {
          natural: valor.natural,
          id_escala_dimension: conversion.id_escala_dimension,
          convertido: conversion.convertido
        }
        array.push(apiObject);
      });
    });
    const res = await updateConversiones(array);
    if(res.ok) {
      setDimensiones(old => {
        return old.map(dim => {
          if(dim.id === dimension.id) {
            dim.valores = valores;
          }
          return dim;
        })
      })
      setSaveConversiones(false);
    }
  }

  return (
    <DangerIconButton 
      title="Guardar conversiones" 
      onClick={handleSave}
      disabled={!saveConversiones}
      blink
    >
      <i className="fa-solid fa-floppy-disk"></i>
    </DangerIconButton>
  )
}

export default EditarConversionesButton