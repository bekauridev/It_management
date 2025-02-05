import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./contexts/AuthContextProvider";

import "./index.css";
import App from "./App.jsx";

import customTheme from "./ui-theme/theme.js";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Auth Context Provider */}
      <AuthContextProvider>
        {/* Joy Theme */}
        <CssVarsProvider theme={customTheme}>
          <CssBaseline />
          <App />
        </CssVarsProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
