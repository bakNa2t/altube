import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  border: none;
  font-family: "Geist Mono", monospace;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
}
`;

export default GlobalStyles;
