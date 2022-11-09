import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Pagination = ({ cant, rows, page, setPage }) => {
  const pagination = cant != 0? page : 0;
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    //RECALCULAR PAGINA
    const newPages = Math.ceil(cant / rows);
    setPages(newPages);
    if(page > newPages) setPage(newPages);
    if(page < 1 && cant != 0) setPage(1);
  }, [cant, rows]);

  useEffect(() => {
    //RECALCULAR VARIABLES
    setFrom(((page - 1) * rows) + 1);
    setTo(page * rows);
  }, [page])

  return (
    <PaginationContainer>
      <PaginationCounter>
        {cant != 0? from : 0}-{to > cant? cant : to} de {cant}
      </PaginationCounter>
      <ChangePageContainer>
        <RowsPage>Filas por pagina: {rows}</RowsPage>
        <ButtonPagContainer>
          <ButtonChange onClick={() => pagination != 0 && pagination != 1 && setPage(page - 1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </ButtonChange>
          <RowsPage>{pagination}/{pages}</RowsPage>
          <ButtonChange 
            onClick={() => pagination != pages && setPage(page + 1)}>
            <i className="fa-solid fa-arrow-right"></i>
          </ButtonChange>
        </ButtonPagContainer>
      </ChangePageContainer>
    </PaginationContainer>
  )
}

export default Pagination;

//PAGINACION ABAJO
const PaginationContainer = styled.div`
  padding: 35px 20px 0px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaginationCounter = styled.p`
  font-size: 12px;
  letter-spacing: 0.03em;
  color: #687182;
`;

const ChangePageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const RowsPage = styled.p`
  font-size: 12px;
  color: #687182;
`;

const ButtonPagContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const ButtonChange = styled.button`
  box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.24);
  width: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: #868FA0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;