import styled from "styled-components";

export const SearchDiv = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  min-width: 200px;
  width: 320px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px 0px 36px;
  border-radius: 6px;
  outline: none;
  border: 1px solid ${props => props.theme.borders};
  background-color: ${props => props.theme.principal};
  color: ${props => props.theme.textPrincipal};

  &::placeholder {
    color: ${props => props.theme.textPrincipal};
  }

  @media (max-width: 900px) {
    width: 140px;
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

  //TABLA

export const StatusContainer = styled.div`
  width: fit-content;
  border-radius: 10px;
  padding: 1px 10px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.estado == 0
      ? props.theme.backgroundBlue
      : props.estado == 1
      ? props.theme.backgroundBlue
      : props.estado == 2
      ? props.theme.backgroundGreen
      : props.estado == 3 && props.theme.backgroundRed};
  color: ${(props) =>
    props.estado == 0
      ? props.theme.textDark
      : props.estado == 1
      ? props.theme.textBlue
      : props.estado == 2
      ? props.theme.textGreen
      : props.estado == 3 && props.theme.textError};
`;

// PAGINATION

export const PaginationContainer = styled.div`
  padding: 0px 20px 0px;
  min-height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationCounter = styled.p`
  font-size: 12px;
  letter-spacing: 0.03em;
  color: ${props => props.theme.textPrincipal};
`;

export const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const RowsPage = styled.p`
  font-size: 12px;
  color: ${props => props.theme.textPrincipal};
`;

export const ButtonPagContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(${props => props.theme.textDarkRGB}, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: ${props => props.theme.textPrincipal};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;