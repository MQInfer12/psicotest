import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const useTableHeight = () => {
  const tableHeightRef = useRef();
  const [tableRows, setTableRows] = useState(0);
  const [rowHeight, setRowHeight] = useState("56px");
  const [resizing, setResizing] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setResizing(true);
      let tableBodyHeight = tableHeightRef?.current?.offsetHeight - 40;
      //56px es el minimo de cada fila de la tabla
      let newRows = Math.floor(tableBodyHeight / 56);
      setTableRows(newRows);
      setRowHeight((tableBodyHeight / newRows) + "px");
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [tableHeightRef]);

  useEffect(() => {
    if(resizing) {
      let timer = setTimeout(() => {
        setResizing(false);
      }, 500);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setResizing(false);
      }, 500);
    }
  }, [resizing]);

  return {
    tableHeightRef,
    tableRows,
    rowHeight,
    resizing
  }
}