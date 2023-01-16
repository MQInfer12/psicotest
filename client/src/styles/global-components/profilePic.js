import styled from "styled-components";
import { theme } from "../globals/themes";

export const DivPic = styled.div`
  border-radius: ${props => props.border ? "100%" : "10px"};
  border: ${props => props.border && "2px solid " + theme.principal};
  transform: ${props => `translateX(${-15 * props.translation}px)`};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;

`;

export const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;