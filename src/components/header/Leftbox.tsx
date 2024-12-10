import styled from "styled-components";
import { SlMenu } from "react-icons/sl";

import Logo from "./Logo";
import { IconStyle } from "../../styles/IconStyle";

import { useAppContext } from "../../context/AppContext";

const StyledLeftbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Leftbox = () => {
  const { toggleSideMenuShortResize, isAppbodyPath } = useAppContext();

  return (
    <StyledLeftbox>
      <IconStyle
        className={`"mneu" ${!isAppbodyPath && "disabled"}`}
        onClick={() => toggleSideMenuShortResize()}
      >
        <SlMenu size={18} />
      </IconStyle>
      <Logo />
    </StyledLeftbox>
  );
};

export default Leftbox;
