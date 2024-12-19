import styled from "styled-components";

import { Text } from "../../styles/TextStyle";
import { useAppContext } from "../../context/AppContext";
import { formatCountSubscriber } from "../../utils/func";
import { useEffect, useState } from "react";
import VideoItemBasic from "./VideoItemBasic";

const StyledChannelItem = styled.div`
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 2rem;
`;

const ChannelBanner = styled.div`
  width: 100%;
  height: 15rem;
  border-radius: 1rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 12rem;
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

const ChannelVideos = styled.div`
  padding: 1.6rem 1.5rem 2rem 0;
`;

const ChannelVideosThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 3rem;
`;

const ChannelItem = () => {
  const [showDesc, setShowDesc] = useState(false);

  const {
    isAppbodyPath,
    fetchChannelDetails,
    fetchChannelsVideos,
    fetchChannelVideosById,
  } = useAppContext();

  if (!isAppbodyPath) {
    document.title = `Altube | ${fetchChannelDetails?.snippet?.title}`;
  }

  useEffect(() => {
    fetchChannelVideosById(fetchChannelDetails?.id);
  }, []);

  const channelDesc = showDesc
    ? fetchChannelDetails?.snippet?.description
    : fetchChannelDetails?.snippet?.description.slice(0, 100);

  console.log(fetchChannelsVideos);

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
            <p>
              {formatCountSubscriber(
                fetchChannelDetails?.statistics?.subscriberCount
              )}{" "}
              subscribers
            </p>
          </div>
          <p className="description">
            {channelDesc}
            {showDesc ? (
              <span onClick={() => setShowDesc(!showDesc)}>Show less</span>
            ) : (
              <span onClick={() => setShowDesc(!showDesc)}> ...more</span>
            )}
          </p>
        </ChannelDetails>
      </ChannelInfo>

      <ChannelVideos>
        <ChannelVideosThumbnails>
          {fetchChannelsVideos?.map((video, index) => (
            <VideoItemBasic dataVideos={video} key={index}></VideoItemBasic>
          ))}
        </ChannelVideosThumbnails>
      </ChannelVideos>
    </StyledChannelItem>
  );
};

export default ChannelItem;
