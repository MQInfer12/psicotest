import styled from "styled-components";
import { theme } from "../globals/themes";

export const DivGroupsPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ButtonAdd = styled.button`
  width: 200px;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

export const DivGroups = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;

// GROUP CARD

export const DivGroupCard = styled.div`
  border-radius: 20px;
  width: 350px;
  height: 200px;
  background-color: ${theme.backgroundCard};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ImgGroup = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

export const DivInfo = styled.div`
  width: 100%;
  height: 120px;
  padding: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  white-space: nowrap;
`;

export const PText = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

export const PDesc = styled.p`
  width: 100%;
  font-size: 0.9rem;
  text-align: justify;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonGroup = styled.button`
  width: 100px;
  height: 30px;
  cursor: pointer;
`;