import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import customTheme from "./ui-theme/theme.js";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <I18nextProvider i18n={i18next}> */}
    <CssVarsProvider theme={customTheme}>
      <CssBaseline />
      <App />
    </CssVarsProvider>
    {/* </I18nextProvider> */}
  </StrictMode>
);
