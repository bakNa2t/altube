import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Backdrop } from "./Content";
import VideoItemBasic from "./VideoItemBasic";

import { useAppContext } from "../../context/AppContext";

const StyledVideoItemWatch = styled.div`
  display: grid;
  grid-template-columns: 71.5vw 24vw;
  width: 100%;
  height: 94.2vh;
  gap: 1.5rem;
  padding: 0 1.5vw;
  overflow: scroll;
`;

const VideoItemContainer = styled.div`
  width: 100;
  padding-top: 1.5rem;
`;

const VideoItemPlayer = styled.div`
  width: 100%;
  height: 44rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const VideosSuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;

  h3 {
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme: { text } }) => text};
  }
`;

const VideoItemWatch = () => {
  const { id } = useParams();
  const { dataVideos, fetchFromApibyId, fetchVideoById, isFetchingVideos } =
    useAppContext();

  document.title = `Altube | ${fetchVideoById?.snippet?.title}`;

  useEffect(() => {
    fetchFromApibyId(id);
  }, [id]);

  if (isFetchingVideos) {
    return <Backdrop />;
  }

  console.log(fetchVideoById, id);
  return (
    <StyledVideoItemWatch>
      <VideoItemContainer>
        <VideoItemPlayer></VideoItemPlayer>
      </VideoItemContainer>
      <VideosSuggestionContainer>
        <h3>Suggestion's Videos</h3>
        {dataVideos.map((video, index) => (
          <VideoItemBasic dataVideos={video} key={index} compactView />
        ))}
      </VideosSuggestionContainer>
    </StyledVideoItemWatch>
  );
};

export default VideoItemWatch;
