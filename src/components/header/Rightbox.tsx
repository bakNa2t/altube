import styled from "styled-components";
import { CgMoreVerticalAlt } from "react-icons/cg";

import AuthBtn from "../auth/AuthBtn";
import { IconStyle } from "../../styles/IconStyle";

const StyledRightbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Rightbox = () => {
  return (
    <StyledRightbox>
      <IconStyle data-tooltip-id="settings" data-tooltip-content="Settings">
        <CgMoreVerticalAlt size={20} />
      </IconStyle>
      <AuthBtn />
    </StyledRightbox>
  );
};

export default Rightbox;
