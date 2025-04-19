/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export interface ApiResponse {
  data: any;
  error: string | null;
  loading: boolean;
  fetchApi: <T = any>(url: string, options?: ApiOptions) => Promise<T | undefined>;
}

export const useApi = (): ApiResponse => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(
    async <T = any>(url: string, options: ApiOptions = {}): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      let fetchUrl = `${import.meta.env.VITE_BACKEND_API_URL}${url}`; 
      
      if (options.params) {
        const query = new URLSearchParams(options.params as Record<string, string>).toString();
        fetchUrl += `?${query}`;
      }

      try {
        const response = await fetch(fetchUrl, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          body: options.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        return result as T;
      } catch (err: any) {
        setError(err.message || "Unknown error");
        setData(null);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, fetchApi };
};