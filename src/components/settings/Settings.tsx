import { useEffect, useRef } from "react";
import styled from "styled-components";
import { HiLanguage } from "react-icons/hi2";
import { GoMoon } from "react-icons/go";

import SettingRow from "./SettingRow";

import { useAppContext } from "../../context/AppContext";

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
  const ref = useRef<HTMLDivElement>(null);
  const {
    theme,
    language,
    text,
    toggleLanguage,
    toggleTheme,
    toggleSettingsDropMenu,
  } = useAppContext();

  const SETTINGS_DATA = [
    {
      label: text.language,
      icon: <HiLanguage size={20} />,
      value: text[language === "english" ? "russian" : "english"],
      onClick: () => toggleLanguage(),
    },
    {
      label: text.appreance,
      icon: <GoMoon size={20} />,
      value: text[theme === "dark" ? "light" : "dark"],
      onClick: () => toggleTheme(),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleSettingsDropMenu();

        console.log("Clicked outside");
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleSettingsDropMenu]);

  return (
    <StyledSettings ref={ref}>
      {SETTINGS_DATA.map(({ label, icon, value, onClick }) => (
        <SettingRow
          key={label}
          label={label}
          icon={icon}
          value={value}
          onClick={onClick}
        />
      ))}
    </StyledSettings>
  );
};

export default Settings;
