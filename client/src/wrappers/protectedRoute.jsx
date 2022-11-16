import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(user) {
      setAuthenticated(true);
      setLoading(false);
    } else if(user === undefined) {
      navigate("/login/" + location.pathname.replaceAll("/", "_47slash_"));
    }
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