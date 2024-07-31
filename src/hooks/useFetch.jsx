import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(url, { ...options });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.json();

      if (result) {
        setLoading(false);
        setErrorMsg(null);
        setData(result);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(`An error occurred: ${error}`);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    errorMsg,
  };
}
