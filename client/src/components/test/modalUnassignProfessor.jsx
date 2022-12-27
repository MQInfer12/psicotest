import React, { useState } from "react";
import useGet from "../../hooks/useGet";
import { deleteProfessorAssigned, getProfessorAssigned } from "../../services/test";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import { DivModal, DivPersona, DivPersonas } from "../../styles/pages/test";
import Cargando from "../globals/cargando";
import ProfilePic from "../globals/profilePic";

const ModalUnAssignProfessor = ({ id, actualizar }) => {
  const { resJson: data, loading } = useGet(getProfessorAssigned, {id})

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
    //const obj = Object.assign({}, vecAux);
    const resp = await deleteProfessorAssigned(vecAux, id);
    if(resp.msg === "se ha eliminado"){
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

export default ModalUnAssignProfessor;