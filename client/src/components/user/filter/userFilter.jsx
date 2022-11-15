import React, { useState } from "react";
import styled from "styled-components";

const UserFilter = ({setFilter, setOptionFilter}) => (
  <DivFilter>
    <SearchDiv>
      <SearchInput
        type="text"
        placeholder="Ingresa filtro"
        onChange={(e) => setFilter(e.target.value)}
      />
      <ISearch className="fa-solid fa-magnifying-glass"></ISearch>
    </SearchDiv>
    
    <SearchSelect
      onChange={(e) => setOptionFilter(e.target.value)}
    >
      <option value={"email"}>Correo</option>
      <option value={"nombre_user"}>Nombre</option>
      <option value={"nombre_rol"}>Rol</option>
    </SearchSelect>
  </DivFilter>
);

export default UserFilter;

const DivFilter = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  gap: 16px;
`;

const SearchDiv = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 240px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px 0px 36px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(104, 113, 130, 0.16);
  outline: none;
  border: none;

  &::placeholder {
    color: #A1A9B8;
  }
`;

const ISearch = styled.i`
  position: absolute;
  left: 13px;
  top: 9px;
  font-size: 14px;
  color: #868FA0;
`;

const SearchSelect = styled.select`
  width: 120px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(104, 113, 130, 0.16);
  outline: none;
  border: none;
  color: #A1A9B8;
`;