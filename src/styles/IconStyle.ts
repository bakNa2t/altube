import styled, { keyframes } from "styled-components";

const beats = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1.1); }
  100% { transform: scale(0.8); }
`;

export const IconStyle = styled.div<{ $showBackground?: boolean }>`
  background-color: ${({ theme, $showBackground }) =>
    $showBackground ? theme.color_grey_3 : "transparent"};
  border-radius: 100rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  &.menu {
    &:hover {
      background-color: ${({ theme: { color_grey_3 } }) => color_grey_3};
    }
  }

  &.listening {
    color: ${({ theme: { color_white } }) => color_white};
    animation: ${beats} 1s linear infinite;
    background-color: ${({ theme: { color_brand } }) => color_brand};
  }

  &.disabled {
    &:hover {
      cursor: not-allowed;
    }
  }
`;
