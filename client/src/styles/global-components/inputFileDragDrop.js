import styled from "styled-components";

export const ContainerInputFile = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed ${props => props.theme.borders};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${props => props.theme.textPrincipal};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border: 1px dashed ${props => props.theme.colorPrincipal};
  }

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & i {
    font-size: 24px;
  }

  & p {
    font-size: 12px;
  }

  & span {
    font-size: 12px;
    text-decoration: underline;
    transition: all 0.2s;

    &:hover {
      color: ${props => props.theme.colorPrincipal};
    }
  }
`;