import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { Text } from "../../styles/TextStyle";

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
`;

const AuthBtn = () => {
  return (
    <StyledAuthBtn>
      <FaRegUserCircle size={20} />
      <Text className="auth">Sign in</Text>
    </StyledAuthBtn>
  );
};

export default AuthBtn;
