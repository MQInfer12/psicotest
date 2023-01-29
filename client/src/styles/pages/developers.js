import styled from "styled-components";

export const AllContainer = styled.div`
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  overflow: hidden;
  color: ${props => props.theme.textDark};

  @media (max-width: 800px) {
    padding-top: 90px;
    min-height: auto;
    height: max-content;
  }
`;

export const ContainerPage = styled.div`
  min-width: 105%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    min-width: 100%;
    display: block;
  }
`;

export const Column = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  transform: skewX(-5deg);
  background-color: ${props => props.theme.backgroundPrincipal};
  display: grid;
  place-content: center;
  padding: 40px;

  &:hover {
    width: calc(100% + 30px);
    background-color: ${props => props.theme.colorPrincipal};

    & .nombres {
      color: ${props => props.theme.textColorPrincipal}
    }
  }

  & > div {
    transform: skewX(5deg);
  }

  @media (max-width: 800px) {
    transform: skewX(0);

    & > div {
      transform: skewX(0);
    }

    &:hover {
      width: calc(100%);
    }
  }
`;

export const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center; 
`;

export const NombreDevs = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 700;
  transition: all 0.5s;
`;

export const PhotoDevs = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 30px;
`;

export const DescripcionDevs = styled.h3`
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s;
`;

export const ButtonContact = styled.a`
  text-decoration: none;
  padding: 10px 20px;
  background-color: ${props => props.theme.principal};
  color: ${props => props.theme.colorPrincipal};
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    color: ${props => props.theme.textColorPrincipal}
  }
`;