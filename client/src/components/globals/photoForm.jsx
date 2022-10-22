import React from "react";
import styled from "styled-components";
import DefaultPhoto from "../../images/defaultPhoto.jpg";

const Pic = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  object-position: center;
  border-radius: ${props => props.border ? "100%" : "10px"};
  border: ${props => props.border && "2px solid #FFFFFF"};
  transform: ${props => `translateX(${-15 * props.translation}px)`};
`;

const ProfilePic = ({ width, height, src, border, translation }) => {
  return (
    <Pic
      width={width}
      height={height}
      src={src ? src : DefaultPhoto}
      border={border}
      translation={translation}
    />
  );
};

ProfilePic.defaultProps = {
  border: false,
  translation: 0,
};

export default ProfilePic;
