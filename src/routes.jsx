import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <LoginScreen />,
  },
  {
    id: 2,
    path: "/home",
    element: <HomeScreen />,
  },
];
