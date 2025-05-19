import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faWrench,
  faMapMarkerAlt,
  faNewspaper,
  faBell,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import {
  HomeContainer,
  HeroSection,
  WelcomeText,
  DashboardGrid,
  ActionButtons,
} from "./dashboardStyles";
import {
  serviceReminders,
  vehicles,
  carActivity,
  newsData,
} from "../../../data/user/dashboardData";
import ActivityWidget from "../../../components/user/ActivityWidget/activityWidget";
import ServiceWidget from "../../../components/user/ServiceWidget/serviceWidget";
import NewsWidget from "../../../components/user/NewsWidget/newsWidget";
import TrackingWidget from "../../../components/user/TrackingWidget/trackingWidget";
import BrandsSection from "../../../components/user/BrandsSection/brandsSection";
import { getUserProfile } from "../../../services/user/api";

const UserHome = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const result = await getUserProfile();
        if (result.success && result.user) {
          setUserProfile(result.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Get the user's first name to display in the welcome message
  const getDisplayName = () => {
    if (loading) return "...";
    if (userProfile && userProfile.fullName) {
      // Extract first name from full name
      const firstName = userProfile.fullName.split(" ")[0];
      return firstName;
    }
    return "User";
  };

  return (
    <HomeContainer>
      <HeroSection>
        <WelcomeText>
          <h1>Welcome back, {getDisplayName()}!</h1>
          <p>Your garage is looking great today.</p>
        </WelcomeText>
      </HeroSection>

      <ActionButtons>
        <button>
          <FontAwesomeIcon icon={faWrench} />
          Book a Service
        </button>
        <button>
          <FontAwesomeIcon icon={faCar} />
          Upgrade Your Car
        </button>
        <button>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          Find Workshops
        </button>
      </ActionButtons>

      <DashboardGrid>
        <ActivityWidget
          title="Recent Activity"
          icon={faChartLine}
          data={carActivity}
        />
        <ServiceWidget
          title="Service Reminders"
          icon={faBell}
          data={serviceReminders}
        />
        <TrackingWidget title="Vehicle Tracking" icon={faCar} data={vehicles} />
        <NewsWidget
          title="Automotive News"
          icon={faNewspaper}
          data={newsData}
        />
      </DashboardGrid>
      <BrandsSection />
    </HomeContainer>
  );
};

export default UserHome;
