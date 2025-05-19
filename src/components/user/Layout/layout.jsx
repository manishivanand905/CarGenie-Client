import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Header from "./Header/header";
import Sidebar from "./Sidebar/sidebar";
import Footer from "./Footer/footer";
import {
  LayoutWrapper,
  MainContainer,
  PageContent,
  ContentWrapper,
} from "./layoutStyles";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <LayoutWrapper>
      <Header />
      <MainContainer>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          currentPath={location.pathname}
        />
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          <PageContent>
            <Outlet />
          </PageContent>
          <Footer />
        </ContentWrapper>
      </MainContainer>
    </LayoutWrapper>
  );
};

export default Layout;
