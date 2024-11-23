import { useState } from "react";
import styled from "styled-components";
import { CgMoreVerticalAlt } from "react-icons/cg";

import { IconStyle } from "../../styles/IconStyle";
import AuthBtn from "../auth/AuthBtn";
import Settings from "../settings/Settings";

const StyledRightbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Rightbox = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <StyledRightbox>
      <IconStyle
        data-tooltip-id="settings"
        data-tooltip-content="Settings"
        onClick={toggleSettings}
      >
        <CgMoreVerticalAlt size={20} />
      </IconStyle>
      <AuthBtn />
      {showSettings && <Settings />}
    </StyledRightbox>
  );
};

export default Rightbox;
