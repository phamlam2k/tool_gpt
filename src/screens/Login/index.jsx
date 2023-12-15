import { useContext, useEffect } from "react";
import { HomeContextProvider } from "../../App";
import { AUTH_TOKEN } from "../../config/const";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
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
      window.location.href =
        "https://dev.sso.lifesup.com.vn/auth?client_id=lifesup_hrm&redirect_uri=https://tool-gpt.vercel.app/&scope=read";
    }
  }, [accessToken, navigate, setAccessToken]);

  return (
    <div className="relative w-screen h-screen bg-blue-400">
      <div className="flex flex-col justify-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-white px-[30px] py-[20px] rounded-lg">
        <p className="text-[24px] font-bold">Đăng nhập để sử dụng form</p>
        <div className="mt-2"></div>
      </div>
    </div>
  );
};

export default LoginScreen;
