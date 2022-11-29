import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DefaultPhoto from "../../assets/profilePic/defaultPhoto.jpg";
import { ProfilePicContext } from "../../context/profilePicContext";
import { getPic } from "../../services/usuario";
import Cargando from "./cargando";
import { Image } from "cloudinary-react";
import { useState } from "react";

const ProfilePic = ({ width, height, border, translation, id, perfil, editable, prev }) => {
  const { profilePics, setProfilePics } = useContext(ProfilePicContext);

  const [previsualizacion, setPrevisualizacion] = useState(() => {
    if (prev === null) return "";
    return "pendiente...";
  });

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
      //RESERVAR ESPACIO PARA NO PEDIR VARIAS VECES SI ES QUE EXISTEN VARIOS COMPONENTES IGUALES EN LA PAGINA
      setProfilePics(old => ({
        ...old,
        [id]: null
      }));
      getProfilePic();
    }
  }, []);

  useEffect(() => {
    setPrevisualizacion(() => {
      if (prev?.type === "image/jpeg" || prev?.type === "image/png") return URL.createObjectURL(prev);
      if (prev === null) return "";
      return "pendiente...";
    });
  }, [prev]);

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
            <Cargando text={false} width={"calc(" + width + " - 20px)"} height={"calc(" + height + " - 20px)"} />
          </DivLoading>
        ) : (
          //FOTO DE PERFIL CARGADA
          editable ? (
            previsualizacion === "pendiente..." ? (
              <Image 
                cloudName="dcy47gguk" 
                publicId={profilePics[id]} 
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} 
              />
            ) : (
              <Pic
                src={previsualizacion != "" ? previsualizacion : DefaultPhoto}
              />
            )
          ) : (
            <Image 
              cloudName="dcy47gguk" 
              publicId={profilePics[id]} 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} 
            />
          )
        )
      ) : (
        //NO TIENE FOTO DE PERFIL
        <Pic 
          src={previsualizacion ? previsualizacion : DefaultPhoto}
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