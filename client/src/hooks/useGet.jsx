import { useEffect, useState } from 'react'

const useGet = (call, obj = {}) => {
  const [resJson, setResJson] = useState([]);
  const [loading, setLoading] = useState(true);

  const callAPI = async () => {
    const response = await call(obj);
    const json = await response?.json();
    setResJson(json);
    setLoading(false);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return {
    callAPI,
    resJson,
    loading,
  }
}

export default useGet