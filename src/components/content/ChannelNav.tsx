import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

const StyledChannelNav = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2rem;
  width: 100%;
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme: { color_divider } }) => color_divider};
  color: ${({ theme: { text } }) => text};
`;

const NavItem = styled.div<{ active?: boolean | string }>`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 2px solid transparent;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${({ theme: { text } }) => text};
  }

  ${({ active, theme: { text } }) =>
    active &&
    `
    border-bottom: 2px solid ${text};
    color: ${text};
  `}
`;

const ChannelNav = () => {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const { text } = useAppContext();

  const handleNavItemClick = (term: string) => {
    setActiveNav(term);
  };

  console.log(activeNav);

  return (
    <StyledChannelNav>
      <NavItem
        active={activeNav === "home"}
        onClick={() => handleNavItemClick("home")}
      >
        {text.home}
      </NavItem>
      <NavItem
        active={activeNav === "videos"}
        onClick={() => handleNavItemClick("videos")}
      >
        {text.videos}
      </NavItem>
      <NavItem
        active={activeNav === "playlists"}
        onClick={() => handleNavItemClick("playlists")}
      >
        {text.playlists}
      </NavItem>
    </StyledChannelNav>
  );
};

export default ChannelNav;
