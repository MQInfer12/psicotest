import { useEffect, useState } from 'react'

const useAPI = (call) => {
  const [resJson, setResJson] = useState({});
  const [loading, setLoading] = useState(true);

  const callAPI = async () => {
    const response = await call();
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

export default useAPI