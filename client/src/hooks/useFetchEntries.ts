import { useEffect } from "react";
import { useEntries } from "./useStore";

const BASE_URL = "http://localhost:3000/";

const useFetchEntries = () => {
  const { entries, setEntries } = useEntries();

  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();

    async function fetchData() {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setEntries(data);
    }

    isMount && fetchData();

    return () => {
      isMount = false;
      controller.abort();
    };
  }, []);
  return entries;
};

export default useFetchEntries;
