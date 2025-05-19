import { useEffect, useState } from "react";
import { validateToken } from "../../../services/user/api";
import {
  HomeContainer,
  HeaderContainer,
  NavContainer,
  LogoContainer,
  LoginButton,
} from "./homeStyles";
import Carousel from "../../../components/user/Carousel/carousel";
import WhyChooseUs from "../../../components/user/WhyChooseUs/whyChooseUs";
import Guidance from "../../../components/user/Guidance/guidance";
import Footer from "../../../components/user/Layout/Footer/footer";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await validateToken();
        setIsAuthenticated(response.success);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <HomeContainer>
      <HeaderContainer>
        <NavContainer>
          <LogoContainer to="/">
            <img
              src="https://res.cloudinary.com/dnr6b3qsg/image/upload/v1742052002/fedx0o4bicoaegu7tpqq.png"
              alt="CarGenie Logo"
            />
          </LogoContainer>

          <LoginButton to={isAuthenticated ? "/user/dashboard" : "/login"}>
            <i className="fa-solid fa-user"></i>
            {isAuthenticated ? "Dashboard" : "Login"}
          </LoginButton>
        </NavContainer>
      </HeaderContainer>

      <main>
        <Carousel />
        <WhyChooseUs />
        <Guidance />
        <Footer />
      </main>
    </HomeContainer>
  );
};

export default Home;
