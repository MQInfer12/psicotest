import React from "react";
import styled from "styled-components";
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

const DivUsersContainer = styled.div`
  border-radius: 20px;
  padding: 30px 0px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-around;
`;