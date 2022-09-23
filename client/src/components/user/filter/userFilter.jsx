import React, { useState } from "react";

const UserFilter = ({handleSaveInput, handleOptionSelect}) => {

  const handleChange = (e) => {
      handleSaveInput(e.target.value)
  }
  const handleOption = (e) => {
      handleOptionSelect(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Ingresa filtro"
        onChange={handleChange}
      />

      <select
        name="optionFilter"
        onChange={handleOption}
      >
        <option value={"email"}>Correo</option>
        <option value={"nombre_user"}>Nombre</option>
        <option value={"nombre_rol"}>Rol</option>
      </select>
    </div>
  );
};

export default UserFilter;
