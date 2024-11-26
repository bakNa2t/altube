import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";

const StyledAppbody = styled.main<{ $isSideMenuShort: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isSideMenuShort }) =>
    $isSideMenuShort ? "4.3rem 1fr" : "13.5rem 1fr"};
  gap: ${({ $isSideMenuShort }) => ($isSideMenuShort ? "1.5rem" : "3rem")};
  width: 100%;
  height: 94.2vh;
`;

const Appbody = () => {
  const { isSideMenuShort } = useAppContext();

  return <StyledAppbody $isSideMenuShort={isSideMenuShort}></StyledAppbody>;
};

export default Appbody;
