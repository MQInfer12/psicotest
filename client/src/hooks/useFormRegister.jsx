import { useState, useContext, useEffect } from "react";
import { signUp } from "../services/auth";

export const UseForm = ( initialForm, validateForm ) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSend = async (form) => {
    try {
      const res = await signUp(form);
      const resJson = await res?.json();
      if(resJson.message =="¡Registro correcto!"){
        console.log(form);
      }
      else alert(resJson.message);
      //setForm(initialForm); //if want cleam the inputs
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  const [cont, setCont] = useState(0);
  useEffect(() => {
    setCont(cont + 1);
    if(cont > 0) {
      if (Object.keys(errors).length === 0) {
        handleSend(form);
        setForm(initialForm);
      }
    }
  }, [errors]);


  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleSubmit,
  };
};
