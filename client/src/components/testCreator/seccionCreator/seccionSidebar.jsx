import React from "react";
import { useState } from "react";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import { WhiteButton } from "../../../styles/globals/formularios";
import { DashPart, DashTitle, SeccionCreatorDash, Selector } from "../../../styles/pages/testCreator";
import SeccionCheckboxes from "./seccionCheckboxes";
import SeccionIndex from "./seccionIndex";
import SeccionOptions from "./seccionOptions";
import IAsettings from "./IAsettings";

const SeccionSidebar = ({ test, editState, loading, setLoading }) => {
  const [option, setOption] = useState(0);
  const { seccion } = useTestCreatorContext();

  return (
    <SeccionCreatorDash>
      <DashPart>
        <DashTitle center><span>{test.nombre}</span></DashTitle>
      </DashPart>
      <SeccionOptions
        test={test}
        loading={loading}
        setLoading={setLoading}
        optionState={{option, setOption}}
      />
      {
        seccion && (
          option === 0 && (
            <>
              <DashPart>
                <WhiteButton 
                  maxwidth="125.27px" 
                  active={editState.editActual == "-1"} 
                  onClick={() => editState.setEditActual(-1)}
                >Dimensiones</WhiteButton>
              </DashPart>
              <DashPart>
                <WhiteButton 
                  active={editState.editActual == "0"} 
                  onClick={() => editState.setEditActual(0)}
                >Preguntas</WhiteButton>
                <WhiteButton 
                  width="125.27px" 
                  active={editState.editActual == "1"} 
                  onClick={() => editState.setEditActual(1)}
                >Reactivos</WhiteButton>
              </DashPart>
              <SeccionCheckboxes />
              <IAsettings test={test} />
            </>
          )
        )
      }
      {
        option === 1 && (
          <SeccionIndex />
        )
      }
    </SeccionCreatorDash>
  )
}

export default SeccionSidebar;