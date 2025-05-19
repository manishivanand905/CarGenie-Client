import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../../components/user/Auth/login";
import Register from "../../../components/user/Auth/register";
import { AuthContainer } from "./authStyles";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(location.pathname !== "/register");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname !== "/register");
  }, [location.pathname]);

  const handleSwitch = (toLogin) => {
    if (isAnimating) return;

    setIsAnimating(true);

    navigate(toLogin ? "/login" : "/register");

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <AuthContainer>
      {isLogin ? (
        <Login onSwitch={() => handleSwitch(false)} isEntering={!isAnimating} />
      ) : (
        <Register
          onSwitch={() => handleSwitch(true)}
          isEntering={!isAnimating}
        />
      )}
    </AuthContainer>
  );
};

export default Auth;
