import styled from "styled-components";
import Leftbox from "./Leftbox";
import Searchbox from "./Searchbox";
import Rightbox from "./Rightbox";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  height: 5.8vh;
  background-color: ${(props) => props.theme.color_blue};
`;
const Header = () => {
  return (
    <StyledHeader>
      <Leftbox />
      <Searchbox />
      <Rightbox />
    </StyledHeader>
  );
};

export default Header;
