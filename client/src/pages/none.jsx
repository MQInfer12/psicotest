import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const None = ({ redirect }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(redirect);
  });

  return (
    <>404 not found</>
  )
}

export default None;