import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";

import VideoItemBasic from "./VideoItemBasic";

import { useAppContext } from "../../context/AppContext";
import { API_URL } from "../../utils/constants/env";
import { Text } from "../../styles/TextStyle";

const StyledVideoItemWatch = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 64vw 30vw;
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
  height: 40rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const VideoItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
  gap: 0.5rem;

  .title {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const VideoItemDescription = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  line-height: 1.5rem;
  background-color: ${({ theme: { bgr_second } }) => bgr_second};
`;

const VideosSuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 94.2%;
  background-color: ${({ theme: { bgr } }) => bgr};
  z-index: 1000;
  opacity: 0.8;
`;

const VideoItemWatch = () => {
  const { id } = useParams();
  const { dataVideos, fetchFromApibyId, fetchVideoById, isFetchingVideos } =
    useAppContext();

  document.title = `Altube | ${fetchVideoById?.snippet?.title}`;

  useEffect(() => {
    fetchFromApibyId(id);
  }, [id]);

  console.log(fetchVideoById);

  if (isFetchingVideos) {
    return <Backdrop />;
  }

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
          <Text className="title">{fetchVideoById?.snippet?.title}</Text>
          <VideoItemDescription>
            <Text>{fetchVideoById?.snippet?.description}</Text>
          </VideoItemDescription>
        </VideoItemDetails>
      </VideoItemContainer>
      <VideosSuggestionContainer>
        {dataVideos.map((video, index) => (
          <VideoItemBasic dataVideos={video} key={index} compactView />
        ))}
      </VideosSuggestionContainer>
    </StyledVideoItemWatch>
  );
};

export default VideoItemWatch;
