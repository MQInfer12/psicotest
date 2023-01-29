import styled from "styled-components";

export const StyledProgress = styled.progress`
  position: absolute;
  bottom: 0;
  left: 0;
  border: none;
  height: 4px;
  width: 100%;

  &::-webkit-progress-bar {
    background-color: ${props => props.theme.borders};
  }
  &::-webkit-progress-value {
    background-color: ${props => props.theme.colorPrincipal};
    transition: all 0.2s ease;
  }

  & > span {
    width: 100%;
  }
`;