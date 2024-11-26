import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";

import { Text } from "../../styles/TextStyle";

import { useAppContext } from "../../context/AppContext";

const StyledAuthBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: max-content;
  padding: 0.4rem 0.7rem;
  border-radius: 10rem;
  color: ${({ theme: { color_blue } }) => color_blue};
  border: 1px solid ${({ theme: { color_grey_1 } }) => color_grey_1};

  &:hover {
    background-color: ${({ theme: { color_grey_3 } }) => color_grey_3};
  }
`;

const AuthBtn = () => {
  const { text } = useAppContext();

  return (
    <StyledAuthBtn>
      <FaRegUserCircle size={20} />
      <Text className="auth">{text.signIn}</Text>
    </StyledAuthBtn>
  );
};

export default AuthBtn;
