import React from "react";
import { DivUsersContainer } from "../../../styles/pages/user";
import UserCard from "../userCard";

const UserResponse = ({ usuarios, filter, optionFilter, handleChange }) => {
  return (
    <DivUsersContainer>
      {usuarios
        .filter((v) => {
          if (filter === "") {
            return v;
          }
          if (optionFilter === "email") {
            if (v.email.toLowerCase().includes(filter.toLowerCase())) {
              return v;
            }
          }
          if (optionFilter === "nombre_user") {
            if (v.nombre_user.toLowerCase().includes(filter.toLowerCase())) {
              return v;
            }
          }
          if (optionFilter === "nombre_rol") {
            if (v.nombre_rol.toLowerCase().includes(filter.toLowerCase())) {
              return v;
            }
          }
        })
        .map((v, i) => {
          return (
            <UserCard key={i} {...v} onSubmit={handleChange} />
          );
        })
      }
    </DivUsersContainer>
  );
};

export default UserResponse;