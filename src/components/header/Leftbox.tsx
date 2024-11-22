import styled from "styled-components";
import { SlMenu } from "react-icons/sl";

import Logo from "./Logo";

const StyledLeftbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Leftbox = () => {
  return (
    <StyledLeftbox>
      <SlMenu size={18} />
      <Logo />
    </StyledLeftbox>
  );
};

export default Leftbox;
