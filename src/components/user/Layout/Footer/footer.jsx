import React from "react";
import { NavLink } from "react-router-dom";
import {
  FooterContainer,
  FooterContent,
  TopSection,
  FooterColumn,
  LinkList,
  LinkItem,
  SocialSection,
  SocialIcon,
  BottomSection,
} from "./footerStyles";

const Footer = () => {
  const aboutLinks = [
    { path: "/our-story", icon: "fa-solid fa-building", text: "Our Story" },
    { path: "/team", icon: "fa-solid fa-users", text: "Team" },
    { path: "/careers", icon: "fa-solid fa-briefcase", text: "Careers" },
    { path: "/press", icon: "fa-solid fa-newspaper", text: "Press" },
  ];

  const serviceLinks = [
    {
      path: "/search",
      icon: "fa-solid fa-magnifying-glass",
      text: "Car Search",
    },
    {
      path: "/valuation",
      icon: "fa-solid fa-chart-line",
      text: "Car Valuation",
    },
    {
      path: "/finance",
      icon: "fa-solid fa-money-bill-wave",
      text: "Car Finance",
    },
    {
      path: "/insurance",
      icon: "fa-solid fa-shield-halved",
      text: "Car Insurance",
    },
  ];

  const supportLinks = [
    { path: "/contact", icon: "fa-solid fa-phone", text: "Contact Us" },
    { path: "/faqs", icon: "fa-solid fa-circle-question", text: "FAQs" },
    {
      path: "/terms",
      icon: "fa-solid fa-file-contract",
      text: "Terms of Service",
    },
    { path: "/privacy", icon: "fa-solid fa-lock", text: "Privacy Policy" },
  ];

  const socialLinks = [
    { path: "/facebook", icon: "fab fa-facebook-f", label: "Facebook" },
    { path: "/twitter", icon: "fab fa-twitter", label: "Twitter" },
    { path: "/instagram", icon: "fab fa-instagram", label: "Instagram" },
    { path: "/linkedin", icon: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <TopSection>
          <FooterColumn>
            <h3>About CarGenie</h3>
            <LinkList>
              {aboutLinks.map((link, index) => (
                <LinkItem key={index}>
                  <NavLink to={link.path} className="nav-link">
                    <i className={link.icon}></i>
                    {link.text}
                  </NavLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <h3>Services</h3>
            <LinkList>
              {serviceLinks.map((link, index) => (
                <LinkItem key={index}>
                  <NavLink to={link.path} className="nav-link">
                    <i className={link.icon}></i>
                    {link.text}
                  </NavLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <h3>Support</h3>
            <LinkList>
              {supportLinks.map((link, index) => (
                <LinkItem key={index}>
                  <NavLink to={link.path} className="nav-link">
                    <i className={link.icon}></i>
                    {link.text}
                  </NavLink>
                </LinkItem>
              ))}
            </LinkList>
          </FooterColumn>

          <FooterColumn>
            <h3>Connect With Us</h3>
            <SocialSection>
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  to={social.path}
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </SocialIcon>
              ))}
            </SocialSection>
          </FooterColumn>
        </TopSection>

        <BottomSection>
          <p>
            &copy; {new Date().getFullYear()} CarGenie. All rights reserved.
          </p>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
