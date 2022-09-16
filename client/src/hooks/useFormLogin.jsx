import { useState, useContext, useEffect } from "react";
import { signIn } from '../services/auth';
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/usuario";
import { UserContext } from "../context/userContext";

export const UseForm = ( initialForm, validateForm ) => {

  const {user, setUser} = useContext(UserContext);

  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const handleSend = async (form) => {
    try {
      const res = await signIn(form);
      const resJson = await res?.json();

      if(resJson.message =="Logged succesfully"){
        setUser(await getProfile());
        navigate('/home');
      }
      else alert(resJson.error);

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
