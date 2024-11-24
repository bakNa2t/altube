import styled from "styled-components";
import { HiLanguage } from "react-icons/hi2";
import { GoMoon } from "react-icons/go";

import SettingRow from "./SettingRow";

const StyledSettings = styled.div`
  position: absolute;
  top: 100%;
  right: 85%;
  display: flex;
  flex-direction: column;
  width: 17.3vw;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: ${({ theme: { color_auth } }) => color_auth};
  box-shadow: 0px 10px 23px -3px ${({ theme: { shadow_temp } }) => shadow_temp};
  z-index: 1000;
`;

const Settings = () => {
  const SETTINGS_DATA = [
    {
      label: "Language",
      icon: <HiLanguage size={20} />,
      value: "English",
      onClick: () => null,
    },
    {
      label: "Apperance",
      icon: <GoMoon size={20} />,
      value: "Theme",
      onClick: () => null,
    },
  ];

  return (
    <StyledSettings>
      {SETTINGS_DATA.map(({ label, icon, value }) => (
        <SettingRow key={label} label={label} icon={icon} value={value} />
      ))}
    </StyledSettings>
  );
};

export default Settings;
