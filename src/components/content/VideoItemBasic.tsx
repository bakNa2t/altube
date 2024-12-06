import { useState } from "react";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

import { Text } from "../../styles/TextStyle";

import { useAppContext } from "../../context/AppContext";
import { VideoProps } from "../../interfaces/videos";
import { TITLE_MAX_LENGTH, API_URL } from "../../utils/constants/env";

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

  .videoChannel {
    font-size: 0.8rem;
    margin: 0.5rem 0 0.2rem 0;
    color: ${({ theme: { color_grey_1 } }) => color_grey_1};
  }
`;

interface IVideoItemBasicProps {
  dataVideos: VideoProps;
}

const VideoItemBasic = ({ dataVideos }: IVideoItemBasicProps) => {
  const [playPreviewVideo, setPlayPreviewVideo] = useState(false);

  const { isSideMenuShort, setWatchVideoItem } = useAppContext();

  console.log(dataVideos);

  const { id, snippet } = dataVideos;

  const videoTitle = snippet.title;

  return (
    <StyledVideoItemBasic
      onMouseOver={() => setPlayPreviewVideo(true)}
      onMouseOut={() => setPlayPreviewVideo(false)}
      onClick={() => setWatchVideoItem(id.videoId)}
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
            url={`${API_URL}${id.videoId}`}
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
          <Text className="videoChannel">{snippet.channelTitle}</Text>
        </VideoItemBasicTitle>
      </VideoItemBasicDesc>
    </StyledVideoItemBasic>
  );
};

export default VideoItemBasic;
