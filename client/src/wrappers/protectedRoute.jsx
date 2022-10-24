import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Cargando from "../components/globals/cargando";

const TodaLaPantalla = styled.div`
  height: 100vh;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(user) {
      setAuthenticated(true);
      setLoading(false);
    } else if(user === undefined) {
      navigate("/login");
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