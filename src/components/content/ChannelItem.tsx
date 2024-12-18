import styled from "styled-components";

import { useAppContext } from "../../context/AppContext";
import { Text } from "../../styles/TextStyle";

const StyledChannelItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
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
      <Text>{fetchChannelDetails?.snippet?.title}</Text>
    </StyledChannelItem>
  );
};

export default ChannelItem;
