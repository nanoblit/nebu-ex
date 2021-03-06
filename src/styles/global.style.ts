import { createGlobalStyle } from "styled-components";

import reset from "./reset.style";
import setSizing from "./setSizing.style";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${setSizing}
  body, button, textarea  {
    font-family: 'Roboto', sans-serif; 
    color: ${({theme}) => theme.colors.text};
  }
  html, body, #root, .App {
    height: 100%;
  }
  body { 
    background: ${({theme}) => theme.colors.background}; 
  }
`;

export default GlobalStyle;