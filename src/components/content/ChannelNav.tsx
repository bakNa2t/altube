import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";

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
`;

const ChannelNav = () => {
  const { text } = useAppContext();

  return (
    <StyledChannelNav>
      <NavItem>{text.home}</NavItem>
      <NavItem>{text.videos}</NavItem>
      <NavItem>{text.playlists}</NavItem>
    </StyledChannelNav>
  );
};

export default ChannelNav;
