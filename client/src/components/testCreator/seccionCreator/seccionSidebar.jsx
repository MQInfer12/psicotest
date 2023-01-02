import React from "react";
import { useState } from "react";
import { useTestCreatorContext } from "../../../context/testCreatorContext";
import { WhiteButton } from "../../../styles/globals/formularios";
import { DashPart, DashTitle, SeccionCreatorDash } from "../../../styles/pages/testCreator";
import SeccionCheckboxes from "./seccionCheckboxes";
import SeccionIndex from "./seccionIndex";
import SeccionOptions from "./seccionOptions";

const SeccionSidebar = ({ test, editState, loading, setLoading }) => {
  const [option, setOption] = useState(0);
  const { seccion } = useTestCreatorContext();

  return (
    <SeccionCreatorDash>
      <DashPart>
        <DashTitle>{test.nombre}</DashTitle>
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
                <WhiteButton active={editState.editActual == "0"} onClick={() => editState.setEditActual(0)}>Preguntas</WhiteButton>
                <WhiteButton active={editState.editActual == "1"} onClick={() => editState.setEditActual(1)}>Reactivos</WhiteButton>
              </DashPart>
              <SeccionCheckboxes />
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