import React, { useState } from "react";

const UserFilter = ({handleSaveInput, handleOptionSelect}) => {
    const [optionFilter, setOptionFilter] = useState("email");
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
        placeholder="Enter Post gmail"
        onChange={handleChange}
      />

      <select
        name="optionFilter"
        onChange={handleOption}
      >
        <option value={"email"}>correo</option>
        <option value={"nombreUser"}>nombre</option>
        <option value={"rol"}>roles</option>
      </select>
    </div>
  );
};

export default UserFilter;
