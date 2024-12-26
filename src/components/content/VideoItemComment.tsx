import React from "react";
import styled from "styled-components";

import { Text } from "../../styles/TextStyle";
import { convertFormatDate } from "../../utils/func";
import { IVideoComments } from "../../interfaces/videoComments";

const CommnetItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: self-start;
  gap: 0.5rem;
`;

const CommentAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1000rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const CommentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.8rem;
`;

const CommentHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;

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

interface VideoItemCommentProps {
  comment: IVideoComments;
}

const VideoItemComment: React.FC<VideoItemCommentProps> = ({ comment }) => {
  return (
    <CommnetItem>
      <CommentInfo>
        <CommentAvatar>
          <img
            src={
              comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
            }
            alt={comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          />
        </CommentAvatar>
        <CommentDetails>
          <CommentHeading>
            <p className="author">
              {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
            </p>
            <p className="date">
              {convertFormatDate(
                comment?.snippet?.topLevelComment?.snippet?.publishedAt
              )}
            </p>
          </CommentHeading>
          <Text>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</Text>
        </CommentDetails>
      </CommentInfo>
    </CommnetItem>
  );
};

export default VideoItemComment;
