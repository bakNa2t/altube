import styled from "styled-components";

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

const NavItem = styled.div`
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
  return (
    <StyledChannelNav>
      <NavItem>Home</NavItem>
      <NavItem>Videos</NavItem>
      <NavItem>Playlists</NavItem>
    </StyledChannelNav>
  );
};

export default ChannelNav;
