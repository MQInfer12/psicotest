import React from "react";
import ProfilePic from "../components/globals/profilePic";
import styled from "styled-components";
import People from "../icons/people";
import Timer from "../icons/timer";

const TestContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 20px;
`;

const Container = styled.div`
  width: 322px;
  height: fit-content;
  display: inline-block;
  background-color: #fff;
  padding: 28px 32px 32px 32px;
  border-radius: 10px;
  border-top: 14px solid #670ce3;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  color: #000000;
`;

const P = styled.p`
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  opacity: 0.6;
`;

const Span = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 3px;
`;

const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 21px;
`;

const ContainerImg = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 26px;
  gap: -16px;
`;

const Test = () => {
  return (
    <TestContainer>
      <Container>
        <H2>Test AMAS-C</H2>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit odio
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
          <ProfilePic width="36px" height="36px" border={true} />
          <ProfilePic width="36px" height="36px" border={true} translation={1} />
          <ProfilePic width="36px" height="36px" border={true} translation={2} />
          <ProfilePic width="36px" height="36px" border={true} translation={3} />
        </ContainerImg>
        </Container>

        <Container>
        <H2>Test AMAS-C</H2>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit odio
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
          <ProfilePic width="36px" height="36px" border={true} />
          <ProfilePic width="36px" height="36px" border={true} translation={1} />
          <ProfilePic width="36px" height="36px" border={true} translation={2} />
          <ProfilePic width="36px" height="36px" border={true} translation={3} />
        </ContainerImg>
      </Container>
    </TestContainer>
  );
};

export default Test;
