import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

import { Text } from "../../styles/TextStyle";

import { useAppContext } from "../../context/AppContext";
import { VideoProps } from "../../interfaces/videos";
import { TITLE_MAX_LENGTH, API_URL } from "../../utils/constants/env";

const StyledVideoShortsItem = styled.div`
  display: flex;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }

  .shortTitle {
    font-size: 1rem;
    margin-top: 0.7rem;
    margin-bottom: 0.4rem;
  }

  .shortDetails {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme: { color_grey_2 } }) => color_grey_2};
  }
`;

const VideoShortsItemThumbnail = styled.div<{ $isSideMenuShort?: boolean }>`
  width: 100%;
  height: 22rem;
  border-radius: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

interface IVideoShortsItemProps {
  dataVideos: VideoProps;
}

const VideoShortsItem = ({ dataVideos }: IVideoShortsItemProps) => {
  const [playPreviewVideo, setPlayPreviewVideo] = useState(false);

  const { isSideMenuShort, setWatchVideoItem } = useAppContext();

  const { id, snippet } = dataVideos;
  const videoTitle = snippet.title;

  return (
    <StyledVideoShortsItem
      onMouseOver={() => setPlayPreviewVideo(true)}
      onMouseOut={() => setPlayPreviewVideo(false)}
      onClick={() => setWatchVideoItem(id.videoId)}
    >
      <VideoShortsItemThumbnail $isSideMenuShort={isSideMenuShort}>
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
      </VideoShortsItemThumbnail>
      <Text className="shortTitle">
        {videoTitle.slice(0, TITLE_MAX_LENGTH)}
        {videoTitle.length > TITLE_MAX_LENGTH && "..."}
      </Text>
      <Text className="shortDetails ">{snippet.channelTitle}</Text>
    </StyledVideoShortsItem>
  );
};

export default VideoShortsItem;
