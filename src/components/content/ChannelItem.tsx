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
  align-items: self-start;
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

    .show-less,
    .show-more {
      cursor: pointer;
      color: ${({ theme: { color_grey_1 } }) => color_grey_1};
    }

    .show-less {
      display: inline-block;
    }
  }
`;

const ChannelVideos = styled.div`
  padding: 1.6rem 1.5rem 2rem 0;

  h2 {
    width: 100%;
    font-weight: 600;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${({ theme: { color_divider } }) => color_divider};
    color: ${({ theme: { text } }) => text};
  }
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

  const hasChannelDesc = fetchChannelDetails?.snippet?.description.length > 0;

  const channelDesc = showDesc
    ? fetchChannelDetails?.snippet?.description
    : fetchChannelDetails?.snippet?.description.slice(0, 140);

  console.log(fetchChannelsVideos);

  return (
    <StyledChannelItem>
      <ChannelBanner>
        <img
          src={
            fetchChannelDetails?.brandingSettings?.image?.bannerExternalUrl
              ? fetchChannelDetails?.brandingSettings?.image?.bannerExternalUrl
              : "assets/images/default-banner.png"
          }
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
            {channelDesc.length > 0 ? channelDesc : "No description"}
            {hasChannelDesc &&
              (showDesc ? (
                <span
                  className="show-less"
                  onClick={() => setShowDesc(!showDesc)}
                >
                  Show less
                </span>
              ) : (
                <span
                  className="show-more"
                  onClick={() => setShowDesc(!showDesc)}
                >
                  {" "}
                  ...more
                </span>
              ))}
          </p>
        </ChannelDetails>
      </ChannelInfo>

      <ChannelVideos>
        <h2>Videos</h2>
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
