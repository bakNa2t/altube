import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import styled from "styled-components";

import { Text } from "../../styles/TextStyle";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: none;
`;

const Logo = () => {
  return (
    <StyledLogo to="/">
      <FaYoutube color="var(color_brand)" size={30} />
      <Text className="logo">Altube</Text>
    </StyledLogo>
  );
};

export default Logo;
