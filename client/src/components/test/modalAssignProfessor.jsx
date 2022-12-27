import React, { useState } from "react";
import { addProfessorToTest, getProfessorNotAssigned } from "../../services/test";
import ProfilePic from "../globals/profilePic";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import Cargando from "../globals/cargando";
import useGet from "../../hooks/useGet";
import { DivModal, DivPersona, DivPersonas } from "../../styles/pages/test";

const ModalAssignProfessor = ({ id, actualizar }) => {
  //TODO: Cambiar useGet
  const { resJson: data, loading } = useGet(getProfessorNotAssigned, {id})

  const [checSelected, setChecSelected] = useState([]);
  const [btnActive, setBtnActive] = useState(false);

  const handleChangeCheck = (e) => {
    var aux = null;
    if (checSelected.includes(e.target.value)) {
      //If the value is there we remove it.
      aux = checSelected.filter((ele) => ele !== e.target.value);
    } else {
      aux = checSelected.concat(e.target.value);
    }
    setChecSelected(aux);
    if (aux.length > 0) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  };

  const saveData = async () => {
    const vecAux = [];
    for (let val of checSelected) {
      const value = parseInt(val);
      vecAux.push(value);
    }
    const obj = Object.assign({}, vecAux);
    const res = await addProfessorToTest(obj, id);
    const resJson = await res?.json();
    if(resJson.mensaje === "se guardo correctamente"){
        actualizar();
    };
  };

  return (
    <FormContainer>
      <DivModal>
        {
          loading ? (
            <Cargando />
          ) : (
            <DivPersonas>
            {data.map((v, i) => (
              <DivPersona key={i}>
                <ProfilePic 
                  width="20px" 
                  height="20px" 
                  perfil={v.perfil}
                />
                {v.nombre_user}
                <input type="checkbox" value={v.id} onChange={handleChangeCheck}/>
              </DivPersona>
            ))}
            </DivPersonas>
          )
        }
      </DivModal>
      <PurpleButton disabled={!btnActive ? true : false} onClick={saveData}>
        Guardar
      </PurpleButton>
    </FormContainer>
  );
};

export default ModalAssignProfessor;