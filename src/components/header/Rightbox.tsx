// import { useState } from "react";
import styled from "styled-components";
import { CgMoreVerticalAlt } from "react-icons/cg";

import Settings from "../settings/Settings";
import AuthBtn from "../auth/AuthBtn";
import { IconStyle } from "../../styles/IconStyle";

import { useAppContext } from "../../context/AppContext";

const StyledRightbox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Rightbox = () => {
  const { showSettings, toggleSettingsDropMenu } = useAppContext();

  return (
    <StyledRightbox>
      <IconStyle
        data-tooltip-id="settings"
        data-tooltip-content="Settings"
        onClick={toggleSettingsDropMenu}
      >
        <CgMoreVerticalAlt size={20} />
      </IconStyle>
      <AuthBtn />
      {showSettings && <Settings />}
    </StyledRightbox>
  );
};

export default Rightbox;
