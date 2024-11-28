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
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0;
  padding-right: 10rem;
  z-index: 100;
`;

const CategoriesItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  background-color: ${({ theme: { color_divider, text } }) => color_divider};

  p {
    color: ${({ theme: { text } }) => text};
  }

  &:hover {
    background-color: ${({ theme: { bgr, color_grey_1 } }) => color_grey_1};
    cursor: pointer;
  }
`;

const Categories = () => {
  const { text } = useAppContext();

  return (
    <StyledCategories>
      {CATEGORIES.map((name, index) => (
        <CategoriesItem key={index}>
          <Text>{text[name as keyof ITranslations]}</Text>
        </CategoriesItem>
      ))}
    </StyledCategories>
  );
};

export default Categories;
