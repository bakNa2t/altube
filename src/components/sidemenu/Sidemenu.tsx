import styled from "styled-components";

const StyledSidemenu = styled.div`
  background-color: ${({ theme: { color_black } }) => color_black};
`;

const Sidemenu = () => {
  return <StyledSidemenu>Sidemenu</StyledSidemenu>;
};

export default Sidemenu;
