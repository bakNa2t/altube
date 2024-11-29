import styled from "styled-components";

import Sidemenu from "../sidemenu/Sidemenu";
import Content from "../content/Content";

import { useAppContext } from "../../context/AppContext";

const StyledAppbody = styled.main<{ $isSideMenuShort: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isSideMenuShort }) =>
    $isSideMenuShort ? "5.4rem 1fr" : "15.5rem 1fr"};
  gap: ${({ $isSideMenuShort }) => ($isSideMenuShort ? "1.5rem" : "3rem")};
  width: 100%;
  height: 94.2vh;
`;

const Appbody = () => {
  const { isSideMenuShort } = useAppContext();

  return (
    <StyledAppbody $isSideMenuShort={isSideMenuShort}>
      <Sidemenu />
      <Content />
    </StyledAppbody>
  );
};

export default Appbody;
