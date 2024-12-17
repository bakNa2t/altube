import { Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

import Header from "./components/header/Header";
import Appbody from "./components/main/Appbody";
import VideoItemWatch from "./components/content/VideoItemWatch";

import { useAppContext } from "./context/AppContext";
import { THEMES } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import ToolTips from "./utils/ToolTips";

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
        <Routes>
          <Route path="/" element={<Appbody />} />
          <Route path="/video/:id" element={<VideoItemWatch />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
