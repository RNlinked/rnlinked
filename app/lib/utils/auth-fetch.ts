export function authFetch<T = any>(url: string, options?: any) {
  const baseURL = "http://localhost:8001";
  const headers = useRequestHeaders(["cookie"]); // only works in SSR context

  return useFetch<T>(url, {
    baseURL,
    headers,
    credentials: "include", // very important for cookies
    ...options,
  });
}
