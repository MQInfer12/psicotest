import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteProfessorAssigned, getProfessorAssigned } from "../../services/test";
import { FormContainer, PurpleButton } from "../../styles/formularios";
import Cargando from "../globals/cargando";
import ProfilePic from "../globals/profilePic";

const DivModal = styled.div`
  background-color: #F4F4F4;
  max-width: 400px;
  height: 150px;
  max-height: 250px;
  padding: 10px;
  border-radius: 10px;
  overflow: scroll;
  overflow-x: hidden;
`;

const DivPersonas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
const DivPersona = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #ADA7A7;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 1px 5px;
  background-color: #FFFFFF;
`;

const ModalUnAssignProfessor = ({ id, actualizar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetData = async () => {
    const res = await getProfessorAssigned(id);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

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
                  id={v.id}
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
