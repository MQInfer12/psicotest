import React from "react";
import styled from "styled-components";
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