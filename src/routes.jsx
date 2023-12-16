import PrivateLayout from "./layout/PrivateLayout";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import PromptScreen from "./screens/Prompt/PromptScreen";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <LoginScreen />,
  },
  {
    id: 2,
    path: "/home",
    element: (
      <PrivateLayout>
        <HomeScreen />
      </PrivateLayout>
    )
  },
  {
    id: 3,
    path: "/prompt",
    element: (
      <PrivateLayout>
        <PromptScreen />
      </PrivateLayout>
    )
  },
];
