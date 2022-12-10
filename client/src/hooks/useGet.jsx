import { useEffect, useState } from 'react'

const useGet = (call, obj = {}, trigger = [], initialValue = []) => {
  const [resJson, setResJson] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  const callAPI = async () => {
    const response = await call(obj);
    const json = await response?.json();
    //console.log(json);
    setResJson(json);
    setLoading(false);
  }

  useEffect(() => {
    let flag = true;
    trigger.forEach(trig => {
      if(!trig) {
        flag = false;
      }
    })
    if(flag) {
      callAPI();
    }
  }, trigger);

  return {
    callAPI,
    resJson,
    loading,
  }
}

export default useGet