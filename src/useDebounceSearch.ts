import { useEffect, useState } from "react";

const fakeSearch = (
  query: string,
  signal: AbortSignal,
): Promise<{ search: string }> => {
  return new Promise((resolve, reject) => {
    const delay = 300 + Math.random() * 700;
    const t = setTimeout(() => {
      resolve({ search: query });
    }, delay);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
};

const useDebounceSearch = (searchQuery: string) => {
  const [result, setResult] = useState<{ search: string }>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!searchQuery) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await fakeSearch(searchQuery, controller.signal);
        setResult(data);
      } catch (e) {
        if ((e as DOMException).name !== "AbortError") throw e;
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  return { result, loading };
};

export default useDebounceSearch;
