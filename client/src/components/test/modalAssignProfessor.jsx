import React, { useEffect } from "react";
import {getProfessor} from '../../services/usuario'
const ModalAssignProfessor = () => {
  useEffect(() => {
    getProfessor()
  }, []);

  return <div>ModalAssignProfessor</div>;
};

export default ModalAssignProfessor;
