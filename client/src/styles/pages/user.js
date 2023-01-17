import styled from "styled-components";

export const DivUsersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${props => props.height};
`;

export const DivControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// USER FILTER

export const DivFilter = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  gap: 16px;
`;

export const SearchDiv = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 240px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px 0px 36px;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${props => props.theme.borders};
  color: ${props => props.theme.textPrincipal};
  background-color: ${props => props.theme.principal};

  &::placeholder {
    color: ${props => props.theme.textPrincipal};
  }
`;

export const ISearch = styled.i`
  position: absolute;
  left: 13px;
  top: 9px;
  font-size: 14px;
  color: ${props => props.theme.textPrincipal};
`;

export const SearchSelect = styled.select`
  width: 120px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${props => props.theme.borders};
  color: ${props => props.theme.textPrincipal};
  background-color: ${props => props.theme.principal};
`;

// USER RESPONSE

export const DivUsersContainer = styled.div`
  border-radius: 20px;
  padding: 30px 0px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// USER CARD

export const DivCard = styled.div`
  margin-top: 35px;
  width: 350px;
  background-color: ${props => props.theme.backgroundCard};
  box-shadow: 4px 4px 4px rgba(${props => props.theme.textDarkRGB}, 0.25);
  padding: 20px;
  border-radius: 20px;
  position: relative;

  & > .img {
    position: absolute;
    top: -50px;
    left: 125px;
    box-shadow: 4px 4px 4px rgba(${props => props.theme.textDarkRGB}, 0.25);
  }
`;

export const DivCardText = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const PNombre = styled.p`
  color: ${props => props.theme.textDark};
  font-size: 22px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PRol = styled.p`
  color: ${props => props.theme.textPrincipal};
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
`;

export const DivRow = styled.div`
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export const DivColumns = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PText = styled.p`
  color: ${props => props.theme.textDark};
  font-size: 14px;
  font-weight: 400;
  width: 110%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PGenero = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-transform: capitalize;
  color: ${props => props.theme.textDark};
  font-size: 14px;
  font-weight: 400;
`;

export const DivCardButtons = styled.div`
  padding-top: 10px;
  justify-content: center;
  display: flex;
  gap: 20px;
`;

export const DivEstado = styled.div`
  display: flex;
  gap: 5px;
  position: absolute;
  top: 10px;
  left: 15px;
  font-size: 12px;
  color: ${props => props.estado ? props.theme.textGreen : props.theme.textRed};
  align-items: center;
  transition: all 0.2s;
`;

// MODAL USER

export const ModalUserContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const Columnas = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const FotoContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;