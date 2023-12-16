import { useEffect } from "react";
import { isLogin } from "../utils";
import { SSO_URL } from "../config/const";

const PrivateLayout = ({ children }) => {
  useEffect(() => {
    if (!isLogin()) {
      window.location.href = window.location.href = SSO_URL;
    }
  }, []);

  return children
}

export default PrivateLayout