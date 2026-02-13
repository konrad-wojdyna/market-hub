import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface GenericProps<T> {
  service: () => Promise<T>;
  dependencies?: unknown[];
}

export const useAsync = <T,>({
  service,
  dependencies = [],
}: GenericProps<T>) => {
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serviceRef = useRef(service);

  useEffect(() => {
    serviceRef.current = service;
  }, [service]);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRef.current();
        if (!isCancelled) setData(response);
      } catch (error) {
        let errorMsg = "Something went wrong. Please try again...";

        if (axios.isAxiosError(error)) {
          errorMsg = error.response?.data?.message;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }

        if (!isCancelled) {
          setError(errorMsg);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [...dependencies]);

  return { isLoading, error, data };
};
