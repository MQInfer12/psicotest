import styled from "styled-components";
import { theme } from "../globals/themes";

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
  box-shadow: 0px 1px 2px rgba(${theme.textDarkRGB}, 0.06), 0px 0px 0px 1px rgba(${theme.textPrincipalRGB}, 0.16);
  outline: none;
  border: none;
  background-color: ${theme.principal};
  color: ${theme.textPrincipal};

  &::placeholder {
    color: ${theme.textPrincipal};
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
  color: ${theme.textPrincipal};
`;

export const SearchSelect = styled.select`
  width: 120px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(${theme.textDarkRGB}, 0.06), 0px 0px 0px 1px rgba(${theme.textPrincipalRGB}, 0.16);
  outline: none;
  border: none;
  color: ${theme.textPrincipal};
  background-color: ${theme.principal};
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
      ? theme.backgroundBlue
      : props.estado == 1
      ? theme.backgroundBlue
      : props.estado == 2
      ? theme.backgroundGreen
      : props.estado == 3 && theme.backgroundRed};
  color: ${(props) =>
    props.estado == 0
      ? theme.textDark
      : props.estado == 1
      ? theme.textBlue
      : props.estado == 2
      ? theme.textGreen
      : props.estado == 3 && theme.textError};
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
  color: ${theme.textPrincipal};
`;

export const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const RowsPage = styled.p`
  font-size: 12px;
  color: ${theme.textPrincipal};
`;

export const ButtonPagContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(${theme.textDarkRGB}, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: ${theme.textPrincipal};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;