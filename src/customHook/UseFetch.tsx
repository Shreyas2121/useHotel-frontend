import axios from "axios";
import { useEffect, useState } from "react";

export const UseFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);
      setData(data);
      setLoading(false);
      return data;
    };
    fetchData();
  }, [url]);

  return { data, loading };
};
