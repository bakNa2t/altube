import styled from "styled-components";

import VideosThumbnailsContainer from "./VideosThumbnailsContainer";
import VideoItemBasic from "./VideoItemBasic";

import { useAppContext } from "../../context/AppContext";

const StyledVideosBoard = styled.div`
  height: 88.7vh;
  padding: 1.6rem 1.5rem 0 0;
  overflow-y: scroll;
`;
const VideosBoard = () => {
  const { dataVideos } = useAppContext();

  const UP_VIDEO_BLOCK = dataVideos.slice(0, 8);
  // const MIDDLE_VIDEO_BLOCK = dataVideos.slice(8, 20);
  // const DOWN_VIDEO_BLOCK = dataVideos.slice(20, 28);

  return (
    <StyledVideosBoard>
      <VideosThumbnailsContainer>
        {UP_VIDEO_BLOCK.map((video, index) => (
          <VideoItemBasic dataVideos={video} key={index}></VideoItemBasic>
        ))}
      </VideosThumbnailsContainer>
    </StyledVideosBoard>
  );
};

export default VideosBoard;
