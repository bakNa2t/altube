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
  transition: background-color 0.3s, border 1s;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
}

::-webkit-scrollbar {
    width: 0;
    background: transparent;
}

-ms-overflow-style: none;
scrollbar-width: none;

&::-webkit-scrollbar {
    display: none;
}

input:focus {
  outline: none;
}
`;

export default GlobalStyles;
