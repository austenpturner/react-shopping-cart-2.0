import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchData() {
    setDataLoaded(false);
    try {
      const response = await fetch(url, { ...options });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      if (result) {
        setDataLoaded(true);
        setErrorMsg(null);
        setData(result);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(`An error occurred: ${error}`);
      setDataLoaded(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    dataLoaded,
    errorMsg,
  };
}
