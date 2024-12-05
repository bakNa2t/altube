import { useState } from "react";
import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";

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

const VideoShortsItem = () => {
  const [playPreviewVideo, setPlayPreviewVideo] = useState(false);

  const { isSideMenuShort } = useAppContext();

  const { id, snippet } = dataVideos;
  const videoTitle = snippet.title;

  return (
    <StyledVideoShortsItem
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
          <Text className="videoChannel">{snippet.channelTitle}</Text>
        </VideoItemBasicTitle>
      </VideoItemBasicDesc>
    </StyledVideoShortsItem>
  );
};

export default VideoShortsItem;
