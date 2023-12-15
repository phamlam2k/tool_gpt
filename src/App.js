import React, { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { isLogin } from "./utils";
import { AUTH_TOKEN } from "./config/const";

import "react-quill/dist/quill.snow.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const HomeContextProvider = createContext({});

const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (isLogin()) {
      setAccessToken(localStorage.getItem(AUTH_TOKEN));
    }
  }, []);

  const data = {
    accessToken,

    setAccessToken,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HomeContextProvider.Provider value={data}>
        <RouterProvider router={router} />
      </HomeContextProvider.Provider>
    </QueryClientProvider>
  );
}

export default App;
