import React from "react";
import styled from "styled-components";
import GroupCard from "./groupCard";

const DivGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;

const GroupResponse = ({ grupos, llenarGrupos }) => {
  return (
    <DivGroups>
      {
        grupos.map((v, i) => (
          <GroupCard key={i} {...v} llenarGrupos={llenarGrupos} />
        ))
      }
    </DivGroups>
  )
}

export default GroupResponse;