import styled from "styled-components";

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
`;
