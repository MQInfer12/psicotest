import React from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";

const Pic = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  object-position: center;
  border-radius: ${(props) => (props.border ? "100%" : "10px")};
`;

const ProfilePic = ({ width, height, src, border }) => {
  return (
    <Pic
      width={width}
      height={height}
      src={src ? src : DefaultPhoto}
      border={border}
    />
  );
};
ProfilePic.defaultProps = {
  border: false,
};
export default ProfilePic;
