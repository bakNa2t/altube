import { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const url = "https://www.youtube.com/watch?v=";

const StyledVideoItemBasic = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  gap: 0.8rem;
  background-color: ${({ theme: { color_black } }) => color_black};

  &:hover {
    cursor: pointer;
  }
`;

interface IVideoItemBasicProps {
  dataVideos: string;
}

const VideoItemBasic = ({ dataVideos }: IVideoItemBasicProps) => {
  const [playPreviewVideo, setPlayPreviewVideo] = useState(false);

  return (
    <StyledVideoItemBasic
      onMouseOver={() => setPlayPreviewVideo(true)}
      onMouseOut={() => setPlayPreviewVideo(false)}
    >
      {playPreviewVideo ? (
        <ReactPlayer
          width="100%"
          height="100%"
          controls={false}
          volume={1}
          muted={false}
          playing={playPreviewVideo}
          url={`${url}${dataVideos.id.videoId}`}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <img src={dataVideos.snippet.thumbnails.medium.url} alt="thmabnail" />
      )}
    </StyledVideoItemBasic>
  );
};

export default VideoItemBasic;
