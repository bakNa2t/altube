import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

import ChannelNav from "./ChannelNav";
import VideoItemBasic from "./VideoItemBasic";

import { Text } from "../../styles/TextStyle";
import { useAppContext } from "../../context/AppContext";
import { formatCountSubscriber } from "../../utils/func";
import { API_URL } from "../../utils/constants/env";

interface ChannelSectionProps {
  active: boolean;
}

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
      display: block;
    }
  }
`;

const ChannelVideos = styled.div`
  padding: 1.6rem 1.5rem 2rem 0;
`;

const ChannelSection = styled.div<ChannelSectionProps>`
  display: ${({ active }) => (active ? "flex" : "none")};
  width: 100%;
  margin-bottom: 2rem;

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 15rem;
    color: ${({ theme: { color_grey_2 } }) => color_grey_2};
  }
`;

const ChannelTrailersThumbnails = styled.div`
  display: flex;
  width: 50%;
  height: 15rem;
  border-radius: 1rem;
  overflow: scroll;
`;

const ChannelVideosThumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 3rem;
`;

const ChannelSubscribeButton = styled.div`
  width: fit-content;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 100rem;
  color: ${({ theme: { bgr } }) => bgr};
  background-color: ${({ theme: { text } }) => text};

  &:hover {
    cursor: pointer;
    color: ${({ theme: { color_grey_1 } }) => color_grey_1};
    background-color: ${({ theme: { color_grey_3 } }) => color_grey_3};
  }
`;

const ChannelItem = () => {
  const [showDesc, setShowDesc] = useState(false);

  const {
    isAppbodyPath,
    fetchChannelDetails,
    fetchChannelsVideos,
    fetchChannelVideosById,
    fetchPlaylistVideos,
    fetchPlaylistVideosById,
    text,
    activeNav,
    handleNavItemClick,
    watchVideoItem,
  } = useAppContext();

  if (!isAppbodyPath) {
    document.title = `Altube | ${fetchChannelDetails?.snippet?.title}`;
  }

  useEffect(() => {
    fetchChannelVideosById(fetchChannelDetails.id);
  }, []);

  useEffect(() => {
    fetchPlaylistVideosById(watchVideoItem);
  }, []);

  const hasChannelDesc = fetchChannelDetails?.snippet?.description.length > 0;

  const channelDesc = showDesc
    ? fetchChannelDetails?.snippet?.description
    : fetchChannelDetails?.snippet?.description.slice(0, 140);

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
              {text.subscribers}
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
                  {text.showLess}
                </span>
              ) : (
                <span
                  className="show-more"
                  onClick={() => setShowDesc(!showDesc)}
                >
                  {" ..."}
                  {text.showMore}
                </span>
              ))}
          </p>
          <ChannelSubscribeButton>{text.subscribe}</ChannelSubscribeButton>
        </ChannelDetails>
      </ChannelInfo>

      <ChannelVideos>
        <ChannelNav />
        <ChannelSection
          active={activeNav === "home"}
          onClick={() => handleNavItemClick("home")}
        >
          {fetchChannelDetails?.brandingSettings?.channel
            ?.unsubscribedTrailer ? (
            <ChannelTrailersThumbnails>
              <ReactPlayer
                width="100%"
                height="100%"
                controls={false}
                volume={0}
                muted={false}
                playing={false}
                url={`${API_URL}${fetchChannelDetails?.brandingSettings?.channel?.unsubscribedTrailer}`}
                style={{ width: "100%", height: "100%" }}
              />
            </ChannelTrailersThumbnails>
          ) : (
            <div className="empty">Channel has no trailers</div>
          )}
        </ChannelSection>

        <ChannelSection
          active={activeNav === "videos"}
          onClick={() => handleNavItemClick("videos")}
        >
          <ChannelVideosThumbnails>
            {fetchChannelsVideos?.map((video, index) => (
              <VideoItemBasic dataVideos={video} key={index}></VideoItemBasic>
            ))}
          </ChannelVideosThumbnails>
        </ChannelSection>

        <ChannelSection
          active={activeNav === "playlists"}
          onClick={() => handleNavItemClick("playlists")}
        >
          {fetchPlaylistVideos ? (
            <ChannelVideosThumbnails>
              {fetchPlaylistVideos?.map((video, index) => (
                <VideoItemBasic dataVideos={video} key={index}></VideoItemBasic>
              ))}
            </ChannelVideosThumbnails>
          ) : (
            <div className="empty">
              Channel has no playlists or could not load them
            </div>
          )}
        </ChannelSection>
      </ChannelVideos>
    </StyledChannelItem>
  );
};

export default ChannelItem;
