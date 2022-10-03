import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectedRole = ({ children, roles = [] }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!roles.includes(user.id_rol)) {
      return navigate("/dashboard");
    } else {
      setAuthorized(true);
    }
  }, [])

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