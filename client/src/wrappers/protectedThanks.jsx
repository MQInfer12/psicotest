import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThanksContext } from '../context/thanksContext';

const ProtectedThanks = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const { activateThanks, setActivateThanks } = useContext(ThanksContext);

  useEffect(() => {
    if(activateThanks) {
      setActivateThanks(false);
      setAuthorized(true);
    } else {
      navigate('/dashboard/tests')
    }
  }, []);

  if(authorized) {
    return children;
  }
}

export default ProtectedThanks;