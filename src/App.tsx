import styled from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #8b5cf6;
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
