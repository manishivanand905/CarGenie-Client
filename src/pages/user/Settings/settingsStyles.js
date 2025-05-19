import styled from "styled-components";

export const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 1rem auto;
    padding: 0 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0.5rem auto;
    padding: 0 0.75rem;
  }
`;

export const SettingsSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.glass};
  animation: fadeIn 0.5s ease-in-out;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 1.5rem 0 1rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.25rem;
    margin-bottom: 1rem;
    border-radius: 8px;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
    }

    h3 {
      font-size: 1.1rem;
      margin: 1.25rem 0 0.75rem;
    }
  }
`;

export const NotificationsGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.tablet}) and (max-width: ${({ theme }) =>
      theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const NotificationSection = styled.div`
  background: ${({ theme }) => theme.colors.glass};
  padding: 1.5rem;
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.glassDark};
  }

  h3 {
    margin-top: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.25rem;
    animation: slideIn 0.3s ease-out forwards;

    &:hover {
      transform: none;
    }

    &:active {
      background: ${({ theme }) => theme.colors.glassDark};
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const SelectInput = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.glass};
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

export const SettingsInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  font-size: 1rem;
  transition: ${({ theme }) => theme.transitions.default};

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.glass};
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.default};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    width: 100%;
    justify-content: center;

    &:hover {
      transform: none;
    }

    &:active {
      background: ${({ theme }) => theme.colors.secondary};
      transform: translateY(1px);
    }
  }
`;

export const LinkedAccountButton = styled(Button)`
  background: ${({ theme }) => theme.colors.glass};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.5rem 1rem 0.5rem 0;

  &:hover {
    background: ${({ theme }) => theme.colors.glassDark};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0.5rem 0;
  }
`;

export const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0;
  padding: 0.75rem;
  border-radius: 6px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.glass};
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    user-select: none;
  }

  input[type="checkbox"] {
    position: relative;
    width: 50px;
    height: 25px;
    appearance: none;
    background: ${({ theme }) => theme.colors.glass};
    border-radius: 25px;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitions.default};

    &:checked {
      background: ${({ theme }) => theme.colors.accent};
    }

    &::before {
      content: "";
      position: absolute;
      width: 21px;
      height: 21px;
      border-radius: 50%;
      top: 2px;
      left: 2px;
      background: white;
      transition: ${({ theme }) => theme.transitions.default};
    }

    &:checked::before {
      left: 27px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
    margin: 0.5rem 0;

    label {
      font-size: 1rem;
    }

    input[type="checkbox"] {
      width: 56px;
      height: 28px;

      &::before {
        width: 24px;
        height: 24px;
      }

      &:checked::before {
        left: 30px;
      }
    }
  }
`;

export const DeviceCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin: 1rem 0;
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateX(5px);
    background: ${({ theme }) => theme.colors.glassDark};
  }

  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 0.9rem;
    margin: 0.2rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;

    &:hover {
      transform: none;
    }

    &:active {
      background: ${({ theme }) => theme.colors.glassDark};
    }

    h4 {
      font-size: 1.2rem;
    }

    p {
      font-size: 1rem;
      margin: 0.3rem 0;
    }

    Button {
      width: 100%;
      justify-content: center;
    }
  }
`;
