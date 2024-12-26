import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { HiDotsHorizontal } from "react-icons/hi";
import { PiListPlusFill } from "react-icons/pi";
import { IoArrowRedoOutline } from "react-icons/io5";
import { TiThumbsDown, TiThumbsUp } from "react-icons/ti";

import VideoItemBasic from "./VideoItemBasic";

import { Text } from "../../styles/TextStyle";
import { useAppContext } from "../../context/AppContext";
import { API_URL } from "../../utils/constants/env";
import { convertFormatDate, formatCountSubscriber } from "../../utils/func";
import VideoItemComment from "./VideoItemComment";

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
  width: 100%;
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
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
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

  .tag {
    color: ${({ theme: { color_grey_1 } }) => color_grey_1};
  }
`;

const VideoItemDescription = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  line-height: 1.5rem;
  background-color: ${({ theme: { bgr_second } }) => bgr_second};

  .show-less,
  .show-more {
    cursor: pointer;
    color: ${({ theme: { color_grey_1 } }) => color_grey_1};
  }

  .show-less {
    display: block;
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
    dataVideoById,
    isFetchingVideos,
    fetchVideoComments,
    fetchVideoCommentsById,
    fetchChannelDetails,
    fetchChannelDetailsById,
    text,
    isAppbodyPath,
  } = useAppContext();

  if (!isAppbodyPath) {
    document.title = `Altube | ${dataVideoById?.snippet?.title}`;
  }

  useEffect(() => {
    fetchFromApibyId(id);
  }, [id]);

  console.log(dataVideoById);

  useEffect(() => {
    fetchChannelDetailsById(dataVideoById?.snippet?.channelId);
  }, [dataVideoById?.snippet?.channelId]);

  console.log(fetchVideoComments);

  useEffect(() => {
    fetchVideoCommentsById(id);
  }, [id]);

  const hasVideoDesc = dataVideoById?.snippet?.description.length > 0;

  const desc = showDesc
    ? dataVideoById?.snippet?.description
    : dataVideoById?.snippet?.description.slice(0, 200);

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
          <Text className="title">{dataVideoById?.snippet?.title}</Text>
          <VideoItemActions>
            <VideoItemInfo>
              <Link to={`/channel/${dataVideoById?.snippet?.channelId}`}>
                <VideoItemChannelImg>
                  <img
                    src={fetchChannelDetails?.snippet?.thumbnails?.medium?.url}
                    alt="channel avatar"
                  />
                </VideoItemChannelImg>
              </Link>

              <VideoItemChannelDetails>
                <Text className="channel">
                  {dataVideoById?.snippet?.channelTitle}
                </Text>
                <Text className="subscribers">
                  {`${formatCountSubscriber(
                    fetchChannelDetails?.statistics?.subscriberCount
                  )} ${text.subscribers}`}
                </Text>
              </VideoItemChannelDetails>

              <SubscribeBtn>{text.subscribe}</SubscribeBtn>
            </VideoItemInfo>

            <VideoItemActionButtons>
              <ActionButton>
                <>
                  <TiThumbsUp size={18} />
                  <Text>{dataVideoById?.statistics?.likeCount}</Text>
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
              <Text>{dataVideoById?.statistics?.viewCount} views</Text>
              <Text>
                {convertFormatDate(dataVideoById?.snippet?.publishedAt)}
              </Text>

              {dataVideoById?.snippet?.tags?.slice(0, 3).map((tag, index) => (
                <span className="tag" key={index}>
                  #{tag}
                </span>
              ))}
            </VideoItemStats>
            <Text>
              {hasVideoDesc ? desc : text.noDescription}
              {hasVideoDesc &&
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
            </Text>
          </VideoItemDescription>

          <VideoCommentsContainer>
            <h1>
              {dataVideoById?.statistics?.commentCount
                ? `${dataVideoById?.statistics?.commentCount} ${text.comments}`
                : text.noComments}
            </h1>

            {fetchVideoComments?.map(
              (comment, index) =>
                comment?.snippet?.topLevelComment && (
                  <VideoItemComment key={index} comment={comment} />
                )
            )}
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
