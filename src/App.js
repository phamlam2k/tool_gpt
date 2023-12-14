import React, { createContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { isLogin } from "./utils";
import { AUTH_TOKEN } from "./config/const";

export const HomeContextProvider = createContext({});

const router = createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL,
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
    <HomeContextProvider.Provider value={data}>
      <RouterProvider router={router} />
    </HomeContextProvider.Provider>
  );
}

export default App;
