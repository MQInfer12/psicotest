import React from "react";
import { DivFilter, ISearch, SearchDiv, SearchInput, SearchSelect } from "../../../styles/pages/user";

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