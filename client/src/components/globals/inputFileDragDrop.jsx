import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { ContainerInputFile } from '../../styles/global-components/inputFileDragDrop'
import { ErrorCss } from '../../styles/globals/formularios'

const InputFileDragDrop = ({ handleChange, name, types, namePrev, error, text }) => {
  const [typeError, setTypeError] = useState(false);
  const [requerido, setRequerido] = useState(false);

  useEffect(() => {
    if(typeError) {
      setTimeout(() => {
        setTypeError(false);
      }, [2000])
    }
  }, [typeError])

  useEffect(() => {
    if(error) {
      setRequerido(true);
    }
  }, [error]);

  useEffect(() => {
    if(namePrev) {
      setRequerido(false);
    }
  }, [namePrev]);

  return (
    <FileUploader
      handleChange={handleChange} 
      name={name}
      multiple={false}
      types={types}
      onTypeError={() => setTypeError(true)}
    >
      <ContainerInputFile>
        {
          typeError ?
          <ErrorCss>Extensión de archivo no permitida</ErrorCss>
          : requerido ?
          <ErrorCss>{error}</ErrorCss>
          :
          <>
            <i className="fa-regular fa-file-pdf"></i>
            {
              namePrev ?
              <p>{namePrev}</p>
              :
              <div>
                <p>{text ? text : "Arrastra aquí un archivo"}</p>
                <p>o</p>
                <span>Sube un archivo {types.join(", ")}</span>
              </div>
            }
          </>
        }
      </ContainerInputFile>
    </FileUploader>
  )
}

export default InputFileDragDrop