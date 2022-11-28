import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";

let cont = 0;

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(cont) {
      if(Object.keys(user).length != 0) {
        setAuthenticated(true);
        setLoading(false);
      } else if(Object.keys(user).length === 0) {
        navigate("/login/" + location.pathname.replaceAll("/", "_47slash_"));
      }
    }
    cont++;
  }, [user]);

  return (
    loading? (
      <TodaLaPantalla>
        <Cargando />
      </TodaLaPantalla>
    ) : (
      authenticated &&
      children
    )
  )
}

export default ProtectedRoute;

const TodaLaPantalla = styled.div`
  height: 100vh;
`;