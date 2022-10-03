import React, { useState } from "react";
import ModalSchedule from "./modal";
import Modal from "../globals/modal";
const Index = () => {
  const [showForm, setShowForm] = useState(false);
const hideModal = () => {
    setShowForm(false)
}
  return (
    <>
      <button onClick={() => setShowForm(true)}>Agregar horario</button>
      {showForm && (
        <Modal cerrar={hideModal} titulo="Añadir Horario">
          <ModalSchedule hideModal={hideModal} />
        </Modal>
      )}
    </>
  );
};

export default Index;
