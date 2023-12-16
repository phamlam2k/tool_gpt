import { useContext, useEffect } from "react";
import { HomeContextProvider } from "../../App";
import { AUTH_TOKEN, SSO_URL } from "../../config/const";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoginContent = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(HomeContextProvider);

  useEffect(() => {
    const token =
      window.location.href.split("access_token")[1] ||
      localStorage.getItem(AUTH_TOKEN);

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token.replace("=", ""));
      setAccessToken(token.replace("=", ""));
      navigate("/home");
    }

    if (!!!localStorage.getItem(AUTH_TOKEN) && !accessToken) {
      window.location.href = SSO_URL;
    }
  }, [accessToken, navigate, setAccessToken]);

  return (
    <div className="relative w-screen h-screen bg-blue-400 flex justify-center items-center">
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 100, color: "#fff" }} spin />
        }
      />
    </div>
  );
};

export default LoginContent;
