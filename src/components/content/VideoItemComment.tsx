import styled from "styled-components";

import { IVideoComments } from "../../interfaces/videoComments";
import { Text } from "../../styles/TextStyle";

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

const VideoItemComment = ({ comment }: IVideoComments) => {
  return (
    <CommnetItem>
      <CommentInfo>
        <CommentAvatar></CommentAvatar>
        <CommentDetails>
          <CommentHeading></CommentHeading>
          <Text>{comment?.snippet?.topLevelComment?.snippet?.textDisplay}</Text>
        </CommentDetails>
      </CommentInfo>
    </CommnetItem>
  );
};

export default VideoItemComment;
