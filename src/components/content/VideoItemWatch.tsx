import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiListPlusFill } from "react-icons/pi";
import { IoArrowRedoOutline } from "react-icons/io5";
import { TiThumbsDown, TiThumbsUp } from "react-icons/ti";

import VideoItemBasic from "./VideoItemBasic";

import { useAppContext } from "../../context/AppContext";
import { API_URL } from "../../utils/constants/env";
import { Text } from "../../styles/TextStyle";
import { convertFormatDate } from "../../utils/func";

const StyledVideoItemWatch = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 64vw 30vw;
  width: 100%;
  height: 94.2vh;
  gap: 1.5rem;
  padding: 0 1.5vw;
  overflow: scroll;
`;

const VideoItemContainer = styled.div`
  width: 100;
  padding-top: 1.5rem;
`;

const VideoItemPlayer = styled.div`
  width: 100%;
  height: 40rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const VideoItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
  gap: 0.5rem;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const VideoItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const VideoItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VideoItemChannelImg = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 1000rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const VideoItemChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  gap: 0.3rem;
  font-size: 0.8rem;

  .channel {
    font-weight: 600;
  }

  .subscribers {
    font-size: 0.8rem;
    color: ${({ theme: { color_grey_3 } }) => color_grey_3};
  }
`;

const SubscribeBtn = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 100rem;
  color: ${({ theme: { bgr } }) => bgr};
  background-color: ${({ theme: { text } }) => text};

  &:hover {
    cursor: pointer;
  }
`;

const VideoItemActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 100rem;
  padding: 0.5rem;
  color: ${({ theme: { text } }) => text};
  background-color: ${({ theme: { color_grey_3 } }) => color_grey_3};

  &:hover {
    cursor: pointer;
  }

  .divider {
    border-left: 1px solid ${({ theme: { color_grey_1 } }) => color_grey_1};
  }
`;

const VideoItemStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
`;

const VideoItemDescription = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  line-height: 1.5rem;
  background-color: ${({ theme: { bgr_second } }) => bgr_second};

  .more {
    color: ${({ theme: { text } }) => text};

    &:hover {
      cursor: pointer;
    }
  }
`;

const VideoCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  /* border-radius: 1rem; */
  margin-top: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme: { text } }) => text};
  }
`;

const VideoCommentsItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .info {
    display: flex;
    /* flex-flow: row wrap; */
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
  }

  .details {
    display: flex;
    flex-direction: column;
    /* margin-left: 1rem; */
    gap: 0.3rem;
    font-size: 0.8rem;
  }

  .avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 1000rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }

  .heading_desc {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .author {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme: { text } }) => text};
  }

  .date {
    color: ${({ theme: { color_grey_3 } }) => color_grey_3};
    font-size: 0.8rem;
  }
`;

const VideosSuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 94.2%;
  background-color: ${({ theme: { bgr } }) => bgr};
  z-index: 1000;
  opacity: 0.8;
`;

const VideoItemWatch = () => {
  const [showDesc, setShowDesc] = useState(false);
  const { id } = useParams();
  const {
    dataVideos,
    fetchFromApibyId,
    fetchVideoById,
    isFetchingVideos,
    fetchVideoComments,
    fetchVideoCommentsById,
    text,
    isAppbodyPath,
  } = useAppContext();

  if (!isAppbodyPath) {
    document.title = `Altube | ${fetchVideoById?.snippet?.title}`;
  }

  useEffect(() => {
    fetchFromApibyId(id);
  }, [id]);

  useEffect(() => {
    fetchVideoCommentsById(id);
  }, [id]);

  console.log(fetchVideoComments);

  const desc = showDesc
    ? fetchVideoById?.snippet?.description
    : fetchVideoById?.snippet?.description.slice(0, 200);

  console.log(fetchVideoById);

  if (isFetchingVideos) {
    return <Backdrop />;
  }

  return (
    <StyledVideoItemWatch>
      <VideoItemContainer>
        <VideoItemPlayer>
          <ReactPlayer
            width="100%"
            height="100%"
            controls={false}
            volume={0}
            muted={false}
            playing={false}
            url={`${API_URL}${id}`}
            style={{ width: "100%", height: "100%" }}
          />
        </VideoItemPlayer>
        <VideoItemDetails>
          <Text className="title">{fetchVideoById?.snippet?.title}</Text>
          <VideoItemActions>
            <VideoItemInfo>
              <VideoItemChannelImg>
                <img
                  src={fetchVideoById?.snippet?.thumbnails?.medium?.url}
                  alt="channel avatar"
                />
              </VideoItemChannelImg>
              <VideoItemChannelDetails>
                <Text className="channel">
                  {fetchVideoById?.snippet?.channelTitle}
                </Text>
                <Text className="subscribers">
                  {`${Math.floor(Math.random() * 100000)} ${text.subscribers}`}
                </Text>
              </VideoItemChannelDetails>
              <SubscribeBtn>{text.subscribe}</SubscribeBtn>
            </VideoItemInfo>

            <VideoItemActionButtons>
              <ActionButton>
                <>
                  <TiThumbsUp size={18} />
                  <Text>{fetchVideoById?.statistics?.likeCount}</Text>
                </>
                <span className="divider">&nbsp;</span>
                <TiThumbsDown size={18} />
              </ActionButton>

              <ActionButton>
                <IoArrowRedoOutline size={18} />
                <Text>{text.share}</Text>
              </ActionButton>

              <ActionButton>
                <PiListPlusFill size={18} />
                <Text>{text.save}</Text>
              </ActionButton>

              <ActionButton>
                <HiDotsHorizontal size={18} />
              </ActionButton>
            </VideoItemActionButtons>
          </VideoItemActions>
          <VideoItemDescription>
            <VideoItemStats>
              <Text>{fetchVideoById?.statistics?.viewCount} views</Text>
              <Text>
                {convertFormatDate(fetchVideoById?.snippet?.publishedAt)}
              </Text>
            </VideoItemStats>
            <Text>
              {desc}
              {showDesc ? (
                <div className="more" onClick={() => setShowDesc(!showDesc)}>
                  Show less
                </div>
              ) : (
                <span className="more" onClick={() => setShowDesc(!showDesc)}>
                  {" "}
                  ...more
                </span>
              )}
            </Text>
          </VideoItemDescription>
          <VideoCommentsContainer>
            <h1>
              {fetchVideoById?.statistics?.commentCount
                ? `${fetchVideoById?.statistics?.commentCount} ${text.comments}`
                : text.noComments}
            </h1>

            {fetchVideoComments?.map((comment, index) => (
              <VideoCommentsItem key={index}>
                {comment?.snippet?.topLevelComment && (
                  <div className="info">
                    <div className="avatar">
                      <img
                        src={
                          comment?.snippet?.topLevelComment?.snippet
                            ?.authorProfileImageUrl
                        }
                        alt="avatar"
                      />
                    </div>
                    <div className="details">
                      <div className="heading_desc">
                        <p className="author">
                          {
                            comment?.snippet?.topLevelComment?.snippet
                              ?.authorDisplayName
                          }
                        </p>
                        <p className="date">
                          {convertFormatDate(comment?.snippet?.publishedAt)}
                        </p>
                      </div>
                      <Text>
                        {
                          comment?.snippet?.topLevelComment?.snippet
                            ?.textDisplay
                        }
                      </Text>
                    </div>
                  </div>
                )}
              </VideoCommentsItem>
            ))}
          </VideoCommentsContainer>
        </VideoItemDetails>
      </VideoItemContainer>
      <VideosSuggestionContainer>
        {dataVideos.map((video, index) => (
          <VideoItemBasic dataVideos={video} key={index} compactView />
        ))}
      </VideosSuggestionContainer>
    </StyledVideoItemWatch>
  );
};

export default VideoItemWatch;
