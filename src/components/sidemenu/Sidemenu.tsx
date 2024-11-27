import styled from "styled-components";

import { Text } from "../../styles/TextStyle";

import { useAppContext } from "../../context/AppContext";
import { MENU_ITEMS_SHORT } from "../../utils/MenuItems";
import { ITranslations } from "../../utils/translations";

const StyledSidemenu = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${({ theme: { color_black } }) => color_black};
`;

const StyledSideMenuRow = styled.div`
  display: flex;
  border-radius: 0.5rem;
  color: ${({ theme: { text } }) => text};
  background-color: ${({ theme: { color_grey_2 } }) => color_grey_2};

  &.short {
    font-size: 1.4rem;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem 0;

    p {
      font-size: 0.8rem;
    }
  }
`;

const Sidemenu = () => {
  const { isSideMenuShort, text } = useAppContext();

  if (isSideMenuShort) {
    return (
      <StyledSidemenu>
        {MENU_ITEMS_SHORT.map(({ name, icon }) => (
          <StyledSideMenuRow className="short" key={name}>
            {icon}
            <Text>{text[name as keyof ITranslations]}</Text>
          </StyledSideMenuRow>
        ))}
      </StyledSidemenu>
    );
  }

  return <StyledSidemenu>Sidemenu</StyledSidemenu>;
};

export default Sidemenu;
