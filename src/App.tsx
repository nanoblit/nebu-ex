import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import EventForm from "./features/event-form/EventForm";
import GlobalStyle from "./styles/global.style";

const theme: DefaultTheme = {
  colors: {
    text: "#526A94FF",
    background: "#0C1B35FF",
    hover: "#12274DFF"
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <EventForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
