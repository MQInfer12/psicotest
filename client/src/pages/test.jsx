import React from "react";
import ProfilePic from "../components/globals/profilePic";
import styled from "styled-components";
import People from "../icons/people";
import Timer from "../icons/timer";
const Container = styled.div`
  width: 300px;
  height: 300px;
  display: inline-block;
  background-color: #fff;
  margin-right: 20px;
  padding: 25px;
  border-radius: 10px;
  border-top: 12px solid #670ce3;
`;
const H2 = styled.h2`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
`;
const P = styled.p`
  margin-top: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  opacity: 0.6;
`;
const Span = styled.span`
  color: #959595;
  margin-left: 3px;
`;
const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const Test = () => {
  return (
    <>
      <Container>
        <H2>Test AMAS-C</H2>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit odio
          nesciunt quam in,
        </P>

        <ContainerIcon>
          <People />
          <Span>Santiago</Span>
        </ContainerIcon>

        <ContainerIcon>
          <Timer />
          <Span>2 horas</Span>
        </ContainerIcon>

        <ContainerImg>
          <ProfilePic width={"36px"} height={"36px"} border={true} />
          <ProfilePic width={"36px"} height={"36px"} border={true} />
          <ProfilePic width={"36px"} height={"36px"} border={true} />
          <ProfilePic width={"36px"} height={"36px"} border={true} />
        </ContainerImg>
      </Container>
    </>
  );
};

export default Test;
