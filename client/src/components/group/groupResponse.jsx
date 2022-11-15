import React from "react";
import GroupCard from "./groupCard";

const GroupResponse = ({ grupos, llenarGrupos }) => {
  return (
    <>
      {
        grupos.map((v, i) => (
          <GroupCard key={i} {...v} llenarGrupos={llenarGrupos} />
        ))
      }
    </>
  )
}

export default GroupResponse;