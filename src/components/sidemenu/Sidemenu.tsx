import styled from "styled-components";

import { Text } from "../../styles/TextStyle";

import { useAppContext } from "../../context/AppContext";
import { MENU_ITEMS_FULL, MENU_ITEMS_SHORT } from "../../utils/MenuItems";
import { ITranslations } from "../../utils/translations";
import AuthBtn from "../auth/AuthBtn";

const StyledSidemenu = styled.div`
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0rem 0.5rem;

  .title {
    font-size: 1.1rem;
    margin: 0 0 0.5rem 1.7rem;
    font-weight: bold;
  }
`;

const StyledSideMenuFullRow = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme: { color_divider } }) => color_divider};

  &.text {
    font-size: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.1rem 0 1.1rem 1.5rem;
  }
`;

const StyledSideMenuShortRow = styled.div<{ active?: boolean | string }>`
  display: flex;
  border-radius: 0.5rem;
  color: ${({ theme: { text } }) => text};
  background-color: ${({ active, theme: { color_grey_2 } }) =>
    active ? color_grey_2 : null};

  &.short {
    font-size: 1.4rem;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1rem 0rem;

    p {
      font-size: 8px;
    }
  }
  &.full {
    height: 2.5rem;
    font-size: 1.5rem;
    align-items: center;
    margin-left: 0.75rem;
    padding-left: 1rem;
    gap: 1.3rem;
  }

  &:hover {
    background-color: ${({ theme: { color_grey_2 } }) => color_grey_2};
    cursor: pointer;
  }
`;

const Sidemenu = () => {
  const { isSideMenuShort, text, activeMenuLink } = useAppContext();

  return isSideMenuShort ? (
    <StyledSidemenu>
      {MENU_ITEMS_SHORT.map(({ name, icon }) => (
        <StyledSideMenuShortRow
          className="short"
          key={name}
          active={
            activeMenuLink.toLowerCase() ===
            text[name as keyof ITranslations].toLowerCase()
          }
        >
          {icon}
          <Text>{text[name as keyof ITranslations]}</Text>
        </StyledSideMenuShortRow>
      ))}
    </StyledSidemenu>
  ) : (
    <StyledSidemenu>
      {MENU_ITEMS_FULL.map(({ title, list }, index) => (
        <>
          <StyledSideMenuFullRow key={index}>
            {title && (
              <Text className="title">
                {text[title as keyof ITranslations]}
              </Text>
            )}
            <>
              {list.map(({ name, icon }) => (
                <StyledSideMenuShortRow
                  className="full"
                  key={name}
                  active={
                    activeMenuLink.toLowerCase() ===
                    text[name as keyof ITranslations].toLowerCase()
                  }
                >
                  {icon}
                  <Text>{text[name as keyof ITranslations]}</Text>
                </StyledSideMenuShortRow>
              ))}
            </>
          </StyledSideMenuFullRow>
          {index === 1 && (
            <StyledSideMenuFullRow key={index + 1} className="text">
              <Text>{text.signInMenuText}</Text>
              <AuthBtn />
            </StyledSideMenuFullRow>
          )}
        </>
      ))}
    </StyledSidemenu>
  );
};

export default Sidemenu;
