import { useEffect } from 'react';
import { useState } from 'react'
import { useGetContext } from '../context/getContext';
import { http } from '../env';

const useGet = (url, opt = { initialValue: [], alwaysLoading: false, trigger: [], callback: () => {} }) => {
  const initialOpt = { initialValue: [], alwaysLoading: false, trigger: [], callback: () => {} };
  opt = {...initialOpt, ...opt};

  const { gets, setGets } = useGetContext();
  const [resJson, setResJson] = useState(gets[url] ? gets[url] : opt.initialValue);
  const [loading, setLoading] = useState((!gets[url] || opt.alwaysLoading) ? true : false);

  const callAPI = async (cb) => {
    const response = await fetch(http + url);
    if(response.ok) {
      const json = await response?.json();
      setGets(old => ({
        ...old,
        [url]: json
      }))
      setResJson(json);
      if(cb) {
        cb(json);
        opt.callback(json);
      } else {
        opt.callback(json);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    let flag = true;
    opt.trigger.forEach((trig) => {
      if(!trig) {
        flag = false;
      }
    })
    if(flag) {
      callAPI();
    }
  }, opt.trigger);

  return {
    callAPI,
    resJson,
    loading,
  }
}

export default useGet