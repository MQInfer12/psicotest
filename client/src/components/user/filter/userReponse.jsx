import React from "react";
import UserCard from "../userCard";
const UserResponse = ({ usuarios, filter, optionFilter, handleChange }) => {
    const handleChangeSoon = () => {
        handleChange()
    }
  return (
    <>
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
          if (optionFilter === "nombreUser") {
            if (v.nombreUser.toLowerCase().includes(filter.toLowerCase())) {
              return v;
            }
          }
          if (optionFilter === "rol") {
            if (v.rol.toLowerCase().includes(filter.toLowerCase())) {
              return v;
            }
          }
        })
        .map((v, i) => {
          return (
            <div key={i}>
              <UserCard {...v} onSubmit={handleChangeSoon} />
            </div>
          );
        })}
    </>
  );
};

export default UserResponse;
