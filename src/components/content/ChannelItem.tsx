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
  gap: 0.5rem;
`;

const ChannelIcon = styled.div`
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

const ChannelDetails = styled.div``;

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
          <Text>{fetchChannelDetails?.snippet?.title}</Text>
        </ChannelDetails>
      </ChannelInfo>
    </StyledChannelItem>
  );
};

export default ChannelItem;
