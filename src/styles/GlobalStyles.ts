import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    &, &.light-mode {
        --bgr: #f1f5f9;
        --text: #020617;
        --color-brand: #ef4444;
        --color-grey-1: #9ca3af;
        --color-grey-2: #6b7280;
        --color-grey-3: #4b5563;
        --color-blue: #3b82f6;
        --color-auth: #525252;
        --shadow-temp: #0E0E0E;
        --color-white: #fafafa;
        --color-black: #0c0a09;
        --color-divider: #475569;
        --color-backdrop: #0a0a0a;
    }

    &.dark-mode {
        --bgr: #0f172a;
        --text: #e2e8f0;
    }
}


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

::-webkit-scrollbar {
    width: 0;
    background: transparent;
}

-ms-overflow-style: none;
scrollbar-width: none;

&::-webkit-scrollbar {
    display: none;
}
`;

export default GlobalStyles;
