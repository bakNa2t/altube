import styled from "styled-components";

export const Text = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 14px;

  &.logo {
    letter-spacing: -1px;
    font-size: 20px;
    font-weight: 600;
    font-family: "M PLUS Code Latin", sans-serif;
  }

  &.auth {
    color: ${(props) => props.theme.color_blue};
    font-weight: bolder;
  }
`;
