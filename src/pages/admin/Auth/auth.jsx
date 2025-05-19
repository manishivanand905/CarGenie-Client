import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../../components/admin/Auth/login";
import Register from "../../../components/admin/Auth/register";
import { AuthContainer } from "./authStyles";

const AdminAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(
    location.pathname !== "/admin/register"
  );
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsLogin(location.pathname !== "/admin/register");
  }, [location.pathname]);

  const handleSwitch = (toLogin) => {
    if (isAnimating) return;

    setIsAnimating(true);

    navigate(toLogin ? "/admin/login" : "/admin/register");

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

export default AdminAuth;
