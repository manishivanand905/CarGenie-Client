import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const FooterContainer = styled.footer`
  background: #5b2333;
  color: #f7f4f3;
  padding: 4rem 2rem 2rem;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

export const FooterColumn = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: #f7f4f3;
    }
  }
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LinkItem = styled.li`
  margin-bottom: 1rem;

  .nav-link {
    display: flex;
    align-items: center;
    color: #f7f4f3;
    text-decoration: none;
    transition: transform 0.3s ease;

    i {
      margin-right: 10px;
      font-size: 1.1rem;
      width: 20px;
    }

    &:hover {
      transform: translateX(10px);
    }
  }
`;

export const SocialSection = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const SocialIcon = styled(NavLink)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #f7f4f3;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f7f4f3;
  text-decoration: none;
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
  }

  &:hover {
    background: #f7f4f3;
    color: #5b2333;
    transform: translateY(-5px);
  }
`;

export const BottomSection = styled.div`
  border-top: 1px solid rgba(247, 244, 243, 0.1);
  padding-top: 2rem;
  text-align: center;

  p {
    color: #f7f4f3;
    font-size: 0.9rem;
  }
`;
