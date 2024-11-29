import styled from "styled-components";

import Categories from "./Categories";

const StyledContent = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.5vh 88.7vh;
  width: 100%;
  height: 94.2%;
`;

const Content = () => {
  return (
    <StyledContent>
      <Categories />
    </StyledContent>
  );
};

export default Content;
