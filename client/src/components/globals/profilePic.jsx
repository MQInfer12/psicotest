import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";
import { ProfilePicContext } from "../../context/profilePicContext";
import { getPic } from "../../services/usuario";
import Cargando from "./cargando";

const DivPic = styled.div`
  border-radius: ${props => props.border ? "100%" : "10px"};
  border: ${props => props.border && "2px solid #FFFFFF"};
  transform: ${props => `translateX(${-15 * props.translation}px)`};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;
`;

const DivLoading = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > div {
    position: absolute;
    top: 0;
  }
`;

const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ProfilePic = ({ width, height, id, perfil, border, translation }) => {
  const { profilePics, setProfilePics } = useContext(ProfilePicContext);

  const getProfilePic = async () => {
    const res = await getPic(id);
    const resJson = await res?.json();
    setProfilePics(old => ({
      ...old,
      [id]: resJson.perfil
    }));
  }

  useEffect(() => {
    //SI NO SE ENCUENTRA LA FOTO EN EL CONTEXTO PEDIRLA AL SERVIDOR
    if(!Object.keys(profilePics).includes(String(id)) && perfil != null) {
      console.log("Enviando petición de imagen: " + id);
      //RESERVAR ESPACIO PARA NO PEDIR VARIAS VECES SI ES QUE EXISTEN VARIOS COMPONENTES IGUALES EN LA PAGINA
      setProfilePics(old => ({
        ...old,
        [id]: null
      }));
      getProfilePic();
    }
  }, []);

  return (
    <DivPic 
      width={width}
      height={height}
      className="img"
      border={border}
      translation={translation} 
    > 
    {
      perfil ? (
        //SI TIENE FOTO DE PERFIL
        !profilePics[id] ? (
          //FOTO DE PERFIL SIN CARGAR
          <DivLoading>
            <Pic
              src={DefaultPhoto}
            />
            <Cargando text={false} width={"calc(" + width + " - 10px)"} height={"calc(" + height + " - 10px)"} />
          </DivLoading>
        ) : (
          //FOTO CARGADA
          <Pic
            src={profilePics[id]}
          />
        )
      ) : (
        //NO TIENE FOTO DE PERFIL
        <Pic 
          src={DefaultPhoto}
        />
      )
    }
    </DivPic>
  );
};

ProfilePic.defaultProps = {
  border: false,
  translation: 0,
};

export default ProfilePic;
