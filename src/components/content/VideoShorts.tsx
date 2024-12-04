import styled from "styled-components";
import { VideoProps } from "../../interfaces/videos";

interface IVideoShortsProps {
  dataVideos: VideoProps[];
}

const StyledVideoShorts = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const VideoShorts = ({ dataVideos }: IVideoShortsProps) => {
  return <StyledVideoShorts></StyledVideoShorts>;
};

export default VideoShorts;
