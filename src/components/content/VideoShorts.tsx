import styled from "styled-components";
import { SiYoutubeshorts } from "react-icons/si";

import { Text } from "../../styles/TextStyle";

import { VideoProps } from "../../interfaces/videos";
import { useAppContext } from "../../context/AppContext";

interface IVideoShortsProps {
  dataVideos: VideoProps[];
}

const StyledVideoShorts = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const VideoShortsHeading = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 1.4rem;
    margin-left: 0.5rem;
    font-weight: bold;
  }
`;

const VideoShorts = ({ dataVideos }: IVideoShortsProps) => {
  const { text } = useAppContext();

  return (
    <StyledVideoShorts>
      <VideoShortsHeading>
        <SiYoutubeshorts size={25} color="purple" />
        <Text>{text.shorts}</Text>
      </VideoShortsHeading>
    </StyledVideoShorts>
  );
};

export default VideoShorts;
