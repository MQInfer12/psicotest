import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRole = ({ children, roles = [] }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!roles.includes(user.id_rol)) {
      return navigate("/dashboard/tests");
    } else {
      setAuthorized(true);
    }
  })

  return (
    <>
      {
        authorized &&
        children
      }
    </>
  )
}

export default ProtectedRole;