import React, { useEffect, useState } from "react";
import { deleteBenefAssigned, getBeneficiaryAssign } from "../../services/test";
import styled from "styled-components";
import ProfilePic from "../globals/profilePic";
import { FormContainer, PurpleButton } from "../../styles/globals/formularios";
import Cargando from "../globals/cargando";
import useGet from "../../hooks/useGet";

const ModalUnAssignBenef = ({ id, actualizar }) => {
  const { resJson: data, loading } = useGet(getBeneficiaryAssign, {id})

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
    const obj = Object.assign({}, checSelected);
    console.log(id);
    const resp = await deleteBenefAssigned(obj, id);
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
                <input type="checkbox" value={v.email} onChange={handleChangeCheck}/>
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

export default ModalUnAssignBenef;

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