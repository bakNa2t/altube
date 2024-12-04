import { useState } from "react";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";
import { useAppContext } from "../../context/AppContext";
import { Text } from "../../styles/TextStyle";
import { VideoProps } from "../../interfaces/videos";

const TITLE_MAX_LENGTH = 50;

const url = "https://www.youtube.com/watch?v=";

const StyledVideoItemBasic = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`;

const VideoItemThumbnail = styled.div<{ $isSideMenuShort?: boolean }>`
  position: relative;
  width: 100%;
  height: 12.2rem;
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  ${({ $isSideMenuShort }) =>
    $isSideMenuShort &&
    css`
      height: 14rem;
    `};
`;

const VideoItemBasicDesc = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2.3rem 1fr;
  gap: 0.8rem;
`;

const VideoProfileImage = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 1000rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const VideoItemBasicTitle = styled.div`
  margin-top: 0.3rem;

  .videoTitle {
    font-size: 1rem;
    font-weight: 600;
  }
`;

interface IVideoItemBasicProps {
  dataVideos: VideoProps;
}

const VideoItemBasic = ({ dataVideos }: IVideoItemBasicProps) => {
  const [playPreviewVideo, setPlayPreviewVideo] = useState(false);

  const { isSideMenuShort } = useAppContext();

  const { id, snippet } = dataVideos;

  const videoTitle = snippet.title;

  return (
    <StyledVideoItemBasic
      onMouseOver={() => setPlayPreviewVideo(true)}
      onMouseOut={() => setPlayPreviewVideo(false)}
    >
      <VideoItemThumbnail $isSideMenuShort={isSideMenuShort}>
        {playPreviewVideo ? (
          <ReactPlayer
            width="100%"
            height="100%"
            controls={false}
            volume={0}
            muted={false}
            playing={playPreviewVideo}
            url={`${url}${id.videoId}`}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <img src={snippet.thumbnails.medium.url} alt="thmabnail" />
        )}
      </VideoItemThumbnail>
      <VideoItemBasicDesc>
        <VideoProfileImage>
          <img src={snippet.thumbnails.default.url} alt="avatar" />
        </VideoProfileImage>
        <VideoItemBasicTitle>
          <Text className="videoTitle">
            {videoTitle.slice(0, TITLE_MAX_LENGTH)}
            {videoTitle.length > TITLE_MAX_LENGTH && "..."}
          </Text>
        </VideoItemBasicTitle>
      </VideoItemBasicDesc>
    </StyledVideoItemBasic>
  );
};

export default VideoItemBasic;
