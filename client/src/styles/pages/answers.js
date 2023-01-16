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
  box-shadow: 0px 1px 2px rgba(62, 67, 93, 0.06), 0px 0px 0px 1px rgba(173, 167, 167, 0.16);
  outline: none;
  border: none;

  &::placeholder {
    color: #ADA7A7;
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
  color: #ADA7A7;
`;

export const SearchSelect = styled.select`
  width: 120px;
  height: 32px;
  font-weight: 400;
  font-size: 14px;
  padding: 0px 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(62, 67, 93, 0.06), 0px 0px 0px 1px rgba(173, 167, 167, 0.16);
  outline: none;
  border: none;
  color: #ADA7A7;
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
      ? "#F0F1FA"
      : props.estado == 1
      ? "#F0F1FA"
      : props.estado == 2
      ? "#D4FFEA"
      : props.estado == 3 && "#FAF0F3"};
  color: ${(props) =>
    props.estado == 0
      ? "#3E435D"
      : props.estado == 1
      ? "#4F5AED"
      : props.estado == 2
      ? "#179E5B"
      : props.estado == 3 && "#D12953"};
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
  color: #ADA7A7;
`;

export const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const RowsPage = styled.p`
  font-size: 12px;
  color: #ADA7A7;
`;

export const ButtonPagContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(62, 67, 93, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: #ADA7A7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;