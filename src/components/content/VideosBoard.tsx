import styled from "styled-components";

const StyledVideosBoard = styled.div`
  height: 88.7vh;
  padding: 1.6rem 1.5rem 0 0;
  overflow-y: scroll;
  background-color: ${({ theme: { color_grey_1 } }) => color_grey_1};
`;
const VideosBoard = () => {
  return <StyledVideosBoard>VideosBoard</StyledVideosBoard>;
};

export default VideosBoard;
