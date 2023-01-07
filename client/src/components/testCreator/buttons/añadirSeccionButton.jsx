import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { addSeccion } from '../../../services/seccion';
import { WhiteButton } from '../../../styles/globals/formularios'

const AñadirSeccionButton = ({ loading, setLoading, id }) => {
  const { setSecciones } = useTestCreatorContext();

  const añadirSeccion = async () => {
    setLoading(true);
    const res = await addSeccion(id);
    if(res.ok) {
      const resJson = await res?.json();
      setSecciones(old => {
        return [...old, resJson.data];
      });
      console.log("Se creó una nueva sección");
      setLoading(false);
    }
  }

  return (
    <WhiteButton 
      onClick={añadirSeccion} 
      disabled={loading}
    >
      Crear Sección
    </WhiteButton>
  )
}

export default AñadirSeccionButton