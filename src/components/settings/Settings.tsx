import styled from "styled-components";

const StyledSettings = styled.div`
  position: absolute;
  top: 100%;
  right: 85%;
  display: flex;
  flex-direction: column;
  width: 17.3vw;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  background-color: ${({ theme: color_auth }) => color_auth};
  box-shadow: 0px 10px 43px -3px ${({ theme: shadow_temp }) => shadow_temp};
  z-index: 1000;
`;

const Settings = () => {
  return <StyledSettings>Settings</StyledSettings>;
};

export default Settings;
