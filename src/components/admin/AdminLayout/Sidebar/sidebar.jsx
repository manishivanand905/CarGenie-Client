import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBuilding,
  faCar,
  faUsers,
  faChartBar,
  faCogs,
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
    { icon: faTachometerAlt, text: "Dashboard", path: "/admin/dashboard" },
    { icon: faBuilding, text: "Brands", path: "/admin/brands" },
    { icon: faCar, text: "Cars", path: "/admin/cars" },
    { icon: faUsers, text: "Users", path: "/admin/users" },
    { icon: faChartBar, text: "Analytics", path: "/admin/analytics" },
    { icon: faCogs, text: "Settings", path: "/admin/settings" },
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
