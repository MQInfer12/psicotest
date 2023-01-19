import React from 'react'
import { CheckboxInput, DivChecks, DivPersona, DivPersonas } from '../../../styles/pages/test';
import ProfilePic from '../../globals/profilePic';

const ChecksArea = ({ users, selectedsState, idsSelectedState }) => {
  const { selecteds, setSelecteds } = selectedsState;
  const { idsSelected, setIdsSelected } = idsSelectedState;

  const handleChange = (e) => {
    var aux = null;
    var auxIds = null;

    if (selecteds.includes(e.target.value)) {
      //If the value is there we remove it.
      aux = selecteds.filter((ele) => ele !== e.target.value);
    } else {
      aux = selecteds.concat(e.target.value);
    }

    if(idsSelected.includes(e.target.name)) {
      auxIds = idsSelected.filter((ele) => ele !== e.target.name);
    } else {
      auxIds = idsSelected.concat(e.target.name);
    }

    setSelecteds(aux);
    setIdsSelected(auxIds);
  };

  return (
    <DivChecks>
      <DivPersonas>
        {
          users.map((v, i) => (
            <DivPersona key={i}>
              <ProfilePic 
                width="20px" 
                height="20px" 
                perfil={v.perfil} 
              />
              {v.nombre}
              <CheckboxInput 
                type="checkbox" 
                name={v.id}
                value={v.email} 
                onChange={handleChange}
                checked={selecteds.includes(v.email)}
              />
            </DivPersona>
          ))
        }
      </DivPersonas>
    </DivChecks>
  )
}

export default ChecksArea