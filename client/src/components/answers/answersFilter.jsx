import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ISearch, SearchDiv, SearchInput, SearchSelect } from '../../styles/pages/answers'

const AnswersFilter = ({ respuestas, setFiltered }) => {
  const [select, setSelect] = useState("nombre");
  const [filter, setFilter] = useState("");
  const [estado, setEstado] = useState("todos");

  console.log(respuestas)

  const searchRespuestas = () => {
    const newRespuestas = respuestas.filter(respuesta => {
      if(filter === "") return true;
      switch(select) {
        case "nombre":
          return respuesta.nombre_user.toLocaleLowerCase().includes(filter.toLowerCase());
        case "test":
          return respuesta.nombre_test.toLocaleLowerCase().includes(filter.toLowerCase());
        case "psicólogo":
          return respuesta.nombre_docente.toLocaleLowerCase().includes(filter.toLowerCase());
      }
    }).filter(respuesta => {
      if(estado === "todos") return true;
      return respuesta.estado == estado
    });

    setFiltered(newRespuestas);
  }

  useEffect(() => {
    searchRespuestas();
  }, [select, filter, estado, respuestas]);

  return (
    <>
    <SearchSelect onChange={(e) => setSelect(e.target.value)}>
      <option value="nombre">Nombre</option>
      <option value="test">Test</option>
      <option value="psicólogo">Psicólogo</option>
    </SearchSelect>
    <SearchDiv>
      <SearchInput type="text" placeholder={"Buscar " + select + "..."} onChange={(e) => setFilter(e.target.value)} />
      <ISearch className="fa-solid fa-magnifying-glass"></ISearch>
    </SearchDiv>
    <SearchSelect onChange={(e) => setEstado(e.target.value)}>
      <option value="todos">Estado</option>
      <option value="0">Pendiente</option>
      <option value="1">Recibido</option>
      <option value="2">Corregido</option>
    </SearchSelect>
    </>
  )
}

export default AnswersFilter