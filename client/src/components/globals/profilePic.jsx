import React, { useEffect } from "react";
import styled from "styled-components";
import DefaultPhoto from "../../assets/profilePic/defaultPhoto.jpg";
import { Image } from "cloudinary-react";
import { useState } from "react";

const ProfilePic = ({ width, height, border, translation, perfil, editable, prev }) => {
  const [previsualizacion, setPrevisualizacion] = useState("");

  useEffect(() => {
    setPrevisualizacion(() => {
      if (prev?.type === "image/jpeg" || prev?.type === "image/png") return URL.createObjectURL(prev);
      if (!prev) return "";
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
        editable ? (
          previsualizacion === "pendiente..." ? (
            <Image 
              cloudName="dcy47gguk" 
              publicId={perfil} 
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
            publicId={perfil} 
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} 
          />
        )
      ) : (
        //NO TIENE FOTO DE PERFIL
        <Pic 
          src={previsualizacion === "" ? DefaultPhoto : previsualizacion}
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

const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;