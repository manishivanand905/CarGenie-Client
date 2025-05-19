import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faCar,
  faExchangeAlt,
  faFire,
  faCalculator,
  faComments,
  faStar,
  faUsers,
  faChevronLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  SidebarWrapper,
  SidebarContainer,
  DesktopToggleButton,
  MobileToggleButton,
  SidebarContent,
  NavList,
  NavItem,
  NavLink,
  LinkIcon,
  LinkText,
  GlassOverlay,
  MobileOverlay,
} from "./sidebarStyles";

const Sidebar = ({ isOpen, onToggle, currentPath }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebarElement = document.querySelector(".sidebar-container");
      const toggleButton = document.querySelector(".mobile-toggle");
      const isClickInsideSidebar = sidebarElement?.contains(event.target);
      const isClickOnToggle = toggleButton?.contains(event.target);

      if (isOpen && isMobile && !isClickInsideSidebar && !isClickOnToggle) {
        onToggle();
      }
    };

    if (isOpen && isMobile) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle, isMobile]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && isOpen) {
      onToggle();
    }
  };

  const navItems = [
    { icon: faHome, text: "Dashboard", path: "/user/dashboard" },
    { icon: faFire, text: "Cars", path: "/user/cars" },
    { icon: faCar, text: "Explorer", path: "/user/explorer" },
    { icon: faExchangeAlt, text: "Comparison", path: "/user/comparison" },
    { icon: faChartLine, text: "Analytics", path: "/user/analytics" },
    { icon: faCalculator, text: "Calculator", path: "/user/calculator" },
    { icon: faComments, text: "Reviews", path: "/user/reviews" },
    { icon: faStar, text: "Favorites", path: "/user/favorites" },
    { icon: faUsers, text: "Community", path: "/user/community" },
  ];

  return (
    <>
      <MobileToggleButton
        onClick={onToggle}
        isOpen={isOpen}
        className="mobile-toggle"
      >
        <FontAwesomeIcon icon={faBars} />
      </MobileToggleButton>

      <MobileOverlay isOpen={isOpen} onClick={onToggle} />
      <SidebarWrapper isOpen={isOpen}>
        <GlassOverlay />
        <SidebarContainer className="sidebar-container">
          <DesktopToggleButton onClick={onToggle} isOpen={isOpen}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </DesktopToggleButton>

          <SidebarContent>
            <NavList>
              {navItems.map((item, idx) => (
                <NavItem key={idx}>
                  <NavLink
                    onClick={() => handleNavigation(item.path)}
                    isActive={currentPath === item.path}
                    isOpen={isOpen}
                  >
                    <LinkIcon isOpen={isOpen}>
                      <FontAwesomeIcon icon={item.icon} />
                    </LinkIcon>
                    <LinkText isOpen={isOpen}>{item.text}</LinkText>
                  </NavLink>
                </NavItem>
              ))}
            </NavList>
          </SidebarContent>
        </SidebarContainer>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
