import styled from "styled-components";

const StyledCategories = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  padding-right: 10rem;
  z-index: 100;
`;

const Categories = () => {
  return <StyledCategories></StyledCategories>;
};

export default Categories;
