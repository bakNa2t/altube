import { useState } from "react";
import { SiYoutubeshorts } from "react-icons/si";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";

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

const VideoShortsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 1.5rem;
`;

const VideoShortsDropContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 1px solid ${({ theme: { color_divider } }) => color_divider};
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
`;

const VideoShortsDropButton = styled.button`
  width: 23.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0rem;
  border-radius: 100rem;
  transform: translateY(-50%);
  background-color: ${({ theme: { bgr } }) => bgr};
  border: 1px solid ${({ theme: { color_divider } }) => color_divider};

  &:hover {
    background-color: ${({ theme: { color_grey_3 } }) => color_grey_3};
    cursor: pointer;
  }

  .icon {
    color: ${({ theme: { text } }) => text};
  }
`;

const VideoShorts = ({ dataVideos }: IVideoShortsProps) => {
  const [showShorts, setShowShorts] = useState(true);

  const { text } = useAppContext();

  const videoShortsList = showShorts
    ? dataVideos.slice(0, dataVideos.length / 2)
    : dataVideos;

  return (
    <StyledVideoShorts>
      <VideoShortsHeading>
        <SiYoutubeshorts size={25} color="purple" />
        <Text>{text.shorts}</Text>
      </VideoShortsHeading>
      <VideoShortsContainer>
        {videoShortsList.map(({ id, snippet }, index) => (
          <div key={index}>Short {id.videoId}</div>
        ))}
      </VideoShortsContainer>
      <VideoShortsDropContainer>
        <VideoShortsDropButton onClick={() => setShowShorts(!showShorts)}>
          <Text>{showShorts ? text.showMore : text.showLess}</Text>
          {showShorts ? (
            <IoIosArrowDown className="icon" size={20} />
          ) : (
            <IoIosArrowUp className="icon" size={20} />
          )}
        </VideoShortsDropButton>
      </VideoShortsDropContainer>
    </StyledVideoShorts>
  );
};

export default VideoShorts;
