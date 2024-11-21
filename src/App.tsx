import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <h1>Welcome to Altube</h1>
      </AppContainer>
    </>
  );
}

export default App;
