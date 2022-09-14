import { useState, useContext } from "react";
import {signIn} from '../services/auth'

export const UseForm = (
  initialForm,
  validateForm
) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSend = async (form) => {
    try {
      const res = await signIn(form);
      const resJson = await res?.json();
     setLoading(true);
      if(resJson.message =="Logged succesfully"){
        alert('correcto')
        setResponse(true);
        setTimeout(() => (setResponse(false)),3000)
      }
      else alert(resJson.error)
      setForm(initialForm); //if want cleam the inputs
      setLoading(false)

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleBlur = (
    e
  ) => {
    handleChange(e);
    setErrors(validateForm(form));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      handleSend(form);
    } else {
      return;
    }
  };
  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
