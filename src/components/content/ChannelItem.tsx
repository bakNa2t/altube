import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";
import { Text } from "../../styles/TextStyle";

const StyledChannelItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 2rem;
`;

const ChannelBanner = styled.div`
  width: 100%;
  height: 15rem;
  overflow: hidden;
  border-radius: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ChannelIcon = styled.div`
  flex-shrink: 0;
  width: 12rem;
  height: 12rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const ChannelDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme: { text } }) => text};
  }

  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${({ theme: { color_grey_2 } }) => color_grey_2};
  }

  .description {
    color: ${({ theme: { color_grey_2 } }) => color_grey_2};
  }
`;

const ChannelItem = () => {
  const { fetchChannelDetails } = useAppContext();

  console.log(fetchChannelDetails);

  return (
    <StyledChannelItem>
      <ChannelBanner>
        <img
          src={fetchChannelDetails?.brandingSettings?.image?.bannerExternalUrl}
          alt="banner"
        />
      </ChannelBanner>

      <ChannelInfo>
        <ChannelIcon>
          <img
            src={fetchChannelDetails?.snippet?.thumbnails?.medium?.url}
            alt="icon"
          />
        </ChannelIcon>
        <ChannelDetails>
          <h1>{fetchChannelDetails?.snippet?.title}</h1>
          <div className="info">
            <Text>{fetchChannelDetails?.snippet?.customUrl}</Text> •
            <p>{fetchChannelDetails?.statistics?.subscriberCount}</p>
          </div>
          <p className="description">
            {fetchChannelDetails?.snippet?.description}
          </p>
        </ChannelDetails>
      </ChannelInfo>
    </StyledChannelItem>
  );
};

export default ChannelItem;
