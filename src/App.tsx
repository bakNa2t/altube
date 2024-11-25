import styled, { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

import Header from "./components/header/Header";
import ToolTips from "./utils/ToolTips";

import { THEMES } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { useAppContext } from "./context/AppContext";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* color: ${({ theme }) => theme.text}; */
  background-color: ${(props) => props.theme.bgr};
`;

function App() {
  const { theme } = useAppContext();

  return (
    <ThemeProvider theme={THEMES[theme] as DefaultTheme}>
      <GlobalStyles />
      <ToolTips />
      <AppContainer>
        <Header />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
