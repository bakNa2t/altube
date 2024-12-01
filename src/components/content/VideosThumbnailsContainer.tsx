import styled from "styled-components";

const SryledVideosThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 3rem;
`;

const VideosThumbnailsContainer = () => {
  return (
    <SryledVideosThumbnailsContainer>
      VideosThumbnailsContainer
    </SryledVideosThumbnailsContainer>
  );
};

export default VideosThumbnailsContainer;
