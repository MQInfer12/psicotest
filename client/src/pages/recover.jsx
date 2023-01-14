import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoginTemplate from '../components/login/loginTemplate'
import ModalRegister from '../components/login/modalRegister';
import FormCode from '../components/recover/formCode';
import FormEmail from '../components/recover/formEmail';
import FormPassword from '../components/recover/formPassword';
import { UseForm } from '../hooks/useForm';
import { useModal } from '../hooks/useModal';
import { changePassword, comprobeCode, sendRecoverEmail } from '../services/recover';
import { initialFormEmail, validationsFormEmail, initialFormCode, validationsFormCode, initialFormPassword, validationsFormPassword } from '../validations/recover';

const Recover = () => {
  const { goTo } = useParams();
  const [ recoverState, setRecoverState ] = useState(0);
  const [ responseMessage, setResponseMessage ] = useState("");
  const [ idRecover, setIdRecover ] = useState(0);
  const [ user, setUser ] = useState({});

  const { openModal, closeModal } = useModal(
    "",
    <ModalRegister goTo={goTo} form={{email: user.email, contrasenia: user.password}} cerrar={() => closeModal()}/>
  );

  const { 
    form: formEmail, 
    errors: errorsEmail, 
    handleChange: handleChangeEmail, 
    handleSubmit: handleSubmitEmail 
  } = UseForm(
    initialFormEmail,
    validationsFormEmail,
    sendRecoverEmail,
    (resJson) => {
      if(resJson.error) return setResponseMessage(resJson.error);
      setResponseMessage("");
      setIdRecover(resJson.data.id);
      setRecoverState(1);
    }
  );

  const {
    form: formCode,
    errors: errorsCode,
    handleChange: handleChangeCode,
    handleSubmit: handleSubmitCode
  } = UseForm(
    initialFormCode,
    validationsFormCode,
    comprobeCode,
    (resJson) => {
      console.log(resJson);
      if(resJson.error) return setResponseMessage(resJson.error);
      setResponseMessage("");
      setRecoverState(2);
    },
    idRecover
  );

  const {
    form: formPassword,
    errors: errorsPassword,
    handleChange: handleChangePassword,
    handleSubmit: handleSubmitPassword
  } = UseForm(
    initialFormPassword,
    validationsFormPassword,
    changePassword,
    (resJson) => {
      setUser(resJson.data);
    },
    idRecover
  );

  useEffect(() => {
    if(Object.keys(user).length != 0) {
      openModal();
    }
  }, [user]);

  return (
    <LoginTemplate
      title="Recuperar"
      goTo={goTo}
      submitButton={recoverState === 0 ? "Enviar correo" : recoverState === 1 ? "Comprobar" : "Aceptar"}
      handleSubmit={recoverState === 0 ? handleSubmitEmail : recoverState === 1 ? handleSubmitCode : handleSubmitPassword}
      responseMessage={responseMessage}
      toLogin
      toRegister
    >
      {
        recoverState === 0 ?
        <FormEmail 
          form={formEmail} 
          errors={errorsEmail} 
          handleChange={handleChangeEmail} 
        /> : recoverState === 1 ?
        <FormCode 
          form={formCode}
          errors={errorsCode}
          handleChange={handleChangeCode}
        /> :
        <FormPassword
          form={formPassword}
          errors={errorsPassword}
          handleChange={handleChangePassword}
        />
      }
    </LoginTemplate>
  )
}

export default Recover