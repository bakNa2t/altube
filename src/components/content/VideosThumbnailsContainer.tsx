import React from "react";
import styled from "styled-components";

interface IVideosThumbnailsContainerProps {
  children: React.ReactNode;
}

const SryledVideosThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 3rem;
`;

const VideosThumbnailsContainer: React.FC<IVideosThumbnailsContainerProps> = ({
  children,
}) => {
  return (
    <SryledVideosThumbnailsContainer>
      {children}
    </SryledVideosThumbnailsContainer>
  );
};

export default VideosThumbnailsContainer;
