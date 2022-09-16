import { useState, useContext, useEffect } from "react";
import { signIn, getProfile } from '../services/auth';
import { useNavigate } from "react-router-dom";

export const UseForm = ( initialForm, validateForm ) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSend = async (form) => {
    try {
      const res = await signIn(form);
      const resJson = await res?.json();
      //setLoading(true);

      if(resJson.message =="Logged succesfully"){
        navigate('/home');
        
        //setResponse(true);
        //setTimeout(() => (setResponse(false)),3000);
      }
      else alert(resJson.error);

      //setForm(initialForm); //if want cleam the inputs
      //setLoading(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
  };

  const [cont, setCont] = useState(0);
  useEffect(() => {
    setCont(cont + 1);
    if(cont > 0) {
      if (Object.keys(errors).length === 0) {
        handleSend(form);
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
