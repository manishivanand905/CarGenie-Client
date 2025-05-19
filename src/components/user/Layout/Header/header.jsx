import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSignOutAlt,
  faCog,
  faUserCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import LogoutModal from "../../Profile/Logout/logout";
import SearchDropdown from "../../SearchDropdown/searchDropdown";
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  SearchWrapper,
  NavActions,
  NotificationButton,
  NotificationBadge,
  ProfileButton,
  DropdownMenu,
  DropdownItem,
  GlassPane,
  NotificationPopup,
  NotificationHeader,
  NotificationTitle,
  MarkAllButton,
  NotificationList,
  NotificationItem,
} from "./headerStyles";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const notificationRef = useRef();
  const profileRef = useRef();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New car comparison available: BMW M3 vs Mercedes-AMG C63",
      read: false,
    },
    {
      id: 2,
      message: "Price drop alert on your saved car",
      read: false,
    },
    {
      id: 3,
      message: "New review posted for Tesla Model 3",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setShowDropdown(false);
        setShowNotifications(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
    setShowNotifications(false);
  }, []);

  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev);
    setShowDropdown(false);
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleNotificationClick = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const handleLogoutClick = useCallback(() => {
    setShowDropdown(false);
    setShowLogoutModal(true);
  }, []);

  return (
    <>
      <HeaderContainer $isVisible={isVisible}>
        <GlassPane />
        <HeaderContent>
          <Logo to="/">
            <img
              src="https://res.cloudinary.com/dnr6b3qsg/image/upload/v1742052002/fedx0o4bicoaegu7tpqq.png"
              alt="CarGenie Logo"
            />
          </Logo>

          <SearchWrapper>
            <SearchDropdown />
          </SearchWrapper>

          <NavActions>
            <div ref={notificationRef}>
              <NotificationButton onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} />
                {unreadCount > 0 && (
                  <NotificationBadge>{unreadCount}</NotificationBadge>
                )}
              </NotificationButton>
              {showNotifications && (
                <NotificationPopup>
                  <NotificationHeader>
                    <NotificationTitle>Notifications</NotificationTitle>
                    {unreadCount > 0 && (
                      <MarkAllButton onClick={markAllAsRead}>
                        Mark all as read
                      </MarkAllButton>
                    )}
                  </NotificationHeader>
                  <NotificationList>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        $read={notification.read}
                      >
                        <div className="notification-content">
                          <FontAwesomeIcon
                            icon={notification.read ? faCheck : faBell}
                            className={notification.read ? "read" : "unread"}
                          />
                          {notification.message}
                        </div>
                      </NotificationItem>
                    ))}
                  </NotificationList>
                </NotificationPopup>
              )}
            </div>

            <div ref={profileRef}>
              <ProfileButton onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} />
                {showDropdown && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => navigate("/user/profile")}>
                      <FontAwesomeIcon icon={faUserCircle} />
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={() => navigate("/user/settings")}>
                      <FontAwesomeIcon icon={faCog} />
                      Settings
                    </DropdownItem>
                    <DropdownItem onClick={handleLogoutClick}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </ProfileButton>
            </div>
          </NavActions>
        </HeaderContent>
      </HeaderContainer>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  );
};

export default Header;
