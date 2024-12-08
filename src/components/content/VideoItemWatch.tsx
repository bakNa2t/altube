import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";

import { Backdrop } from "./Content";
import VideoItemBasic from "./VideoItemBasic";

import { useAppContext } from "../../context/AppContext";
import { API_URL } from "../../utils/constants/env";

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

const VideoItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
  gap: 0.5rem;

  h2 {
    color: ${({ theme: { text } }) => text};
  }
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
        <VideoItemPlayer>
          <ReactPlayer
            width="100%"
            height="100%"
            controls={false}
            volume={0}
            muted={false}
            playing={false}
            url={`${API_URL}${id}`}
            style={{ width: "100%", height: "100%" }}
          />
        </VideoItemPlayer>
        <VideoItemDetails>
          <h2>{fetchVideoById?.snippet?.title}</h2>
        </VideoItemDetails>
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
