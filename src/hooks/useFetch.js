import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchData() {
    setLoadingData(true);
    try {
      const response = await fetch(url, { ...options });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      if (result) {
        setLoadingData(false);
        setErrorMsg(null);
        setData(result);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(`An error occurred: ${error}`);
      setLoadingData(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loadingData,
    errorMsg,
  };
}
