import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import EventForm from "./features/event-form/EventForm";
import GlobalStyle from "./styles/global.style";

const theme: DefaultTheme = {
  colors: {
    text: "#6684B8",
    background: "#0C1B35",
    hover: "#12274D",
    red: "#E45B9D"
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
