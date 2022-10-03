import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { getProfile } from "../services/auth";
import Cargando from "../components/globals/cargando";

const TodaLaPantalla = styled.div`
  height: 100vh;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [effects, setEffects] = useState(false);

  const Authenticate = () => {
    setAuthenticated(true);
    setLoading(false);
  }

  useEffect(() => {
    if(user == undefined) {
      (async () => {
        const userPromise = await getProfile();
        setUser(userPromise);
      })()
    } else {
      Authenticate();
    }
  }, []);

  useEffect(() => {
    if(effects) {
      if(user == undefined) {
        navigate("/");
      } else {
        Authenticate();
      }  
    } 

    setEffects(true);
  }, [user]);

  return (
    <>
      {
        loading? (
          <TodaLaPantalla>
            <Cargando />
          </TodaLaPantalla>
        ) : (
          authenticated &&
          children
        )
      }
    </>
  )
}

export default ProtectedRoute;