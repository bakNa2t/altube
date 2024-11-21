import styled, { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

import GlobalStyles from "./styles/GlobalStyles";
import { THEMES } from "./styles/theme";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgr};
`;

function App() {
  const theme = "dark";

  return (
    <ThemeProvider theme={THEMES[theme] as DefaultTheme}>
      <GlobalStyles />
      <AppContainer>
        <h1>Welcome to Altube</h1>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
