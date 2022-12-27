import React, { useEffect } from "react";
import DefaultPhoto from "../../assets/profilePic/defaultPhoto.jpg";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { DivPic, Pic } from "../../styles/global-components/profilePic";

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