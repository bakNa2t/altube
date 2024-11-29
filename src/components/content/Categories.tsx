import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";
import { CATEGORIES } from "../../utils/constants/categories";
import { Text } from "../../styles/TextStyle";
import { ITranslations } from "../../utils/translations";

const StyledCategories = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  padding-right: 10rem;
  z-index: 100;
`;

const CategoriesItem = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  background-color: ${({ theme: { color_divider, text }, active }) =>
    active ? text : color_divider};

  p {
    color: ${({ theme: { bgr, text }, active }) =>
      active ? bgr : text} !important;
  }

  &:hover {
    background-color: ${({ theme: { color_grey_1 }, active }) =>
      active ? null : color_grey_1};
    cursor: ${({ active }) => (active ? "not-allowed" : "pointer")};
  }
`;

const CategoriesWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  margin-bottom: -20px;
`;

const Categories = () => {
  const { text, activeCategory, setActiveCategory } = useAppContext();

  return (
    <CategoriesWrapper>
      <StyledCategories>
        {CATEGORIES.map((name, index) => (
          <CategoriesItem
            active={name.toLowerCase() === activeCategory.toLowerCase()}
            key={index}
            onClick={() => setActiveCategory(name)}
          >
            <Text>{text[name as keyof ITranslations]}</Text>
          </CategoriesItem>
        ))}
      </StyledCategories>
    </CategoriesWrapper>
  );
};

export default Categories;
