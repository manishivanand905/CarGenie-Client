import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import ScrollUp from "./components/user/ScrollUp/scrollUp";
import ProtectedRoute from "./components/user/ProtectedRoute/protectedRoute";
import AdminProtectedRoute from "./components/admin/ProtectedRoute/protectedRoute";

import Home from "./pages/user/Home/home";
import Auth from "./pages/user/Auth/auth";
import Layout from "./components/user/Layout/layout";
import Dashboard from "./pages/user/Dashboard/dashboard";
import Cars from "./pages/user/Cars/cars";
import CarDetails from "./pages/user/CarDetails/carDetails";
import Analytics from "./pages/user/Analytics/analytics";
import Comparison from "./pages/user/Comparison/comparison";
import Explorer from "./pages/user/Explorer/explorer";
import Calculator from "./pages/user/Calculator/calculator";
import Reviews from "./pages/user/Reviews/reviews";
import Community from "./pages/user/Community/community";
import Favorite from "./pages/user/Favourite/favourite";
import BrandDetails from "./pages/user/BrandDetails/brandDetails";
import Profile from "./pages/user/Profile/profile";
import Settings from "./pages/user/Settings/settings";
import NotFound from "./pages/user/NotFound/notFound";

import AdminAuth from "./pages/admin/Auth/auth";
import AdminLayout from "./components/admin/AdminLayout/adminLayout";
import AdminDashboard from "./pages/admin/Dashboard/dashboard";
import Brands from "./pages/admin/Brands/brands";
import BrandsDetails from "./pages/admin/BrandDetails/brandDetails";
import CarsManagement from "./pages/admin/Cars/cars";
import AdminCarDetails from "./pages/admin/CarDetails/carDetails";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin/register" element={<AdminAuth />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user/*" element={<Layout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="brands/:brandId" element={<BrandDetails />} />
              <Route path="cars" element={<Cars />} />
              <Route path="cars/:id" element={<CarDetails />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="comparison" element={<Comparison />} />
              <Route path="explorer" element={<Explorer />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="favorites" element={<Favorite />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="community" element={<Community />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="brands" element={<Brands />} />
              <Route path="brands/:id" element={<BrandsDetails />} />
              <Route path="cars" element={<CarsManagement />} />
              <Route path="cars/:id" element={<AdminCarDetails />} />
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Route>
          </Route>

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>

        <ScrollUp />
      </Router>
    </ThemeProvider>
  );
};

export default App;
