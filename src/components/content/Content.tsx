import styled from "styled-components";

import Categories from "./Categories";

import { useAppContext } from "../../context/AppContext";

const StyledContent = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5.5vh 88.7vh;
  width: 100%;
  height: 94.2%;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 94.2%;
  background-color: ${({ theme: { bgr } }) => bgr};
  z-index: 1000;
  opacity: 0.8;
`;

const Content = () => {
  const { isFetchingVideos } = useAppContext();

  return (
    <StyledContent>
      <Categories />
      {isFetchingVideos && <Backdrop />}
    </StyledContent>
  );
};

export default Content;
