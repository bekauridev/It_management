// import { createSystem, defaultConfig } from "@chakra-ui/react";

// const customTheme = createSystem(defaultConfig, {
//   colors: {
//     primary: {
//       50: "#E5F4FD", // Soft Sky Blue (light equivalent)
//       100: "#B8E1FA",
//       200: "#8BCEF6",
//       300: "#5EB9F2",
//       400: "#3B82F6", // Bright Blue (Default)
//       500: "#2563EB", // Rich Blue (Dark)
//       600: "#1E3A8A", // Dark Blue
//     },
//     secondary: {
//       50: "#FFF5E5", // mWar Peach (light equivalent)
//       100: "#FEE8B2",
//       200: "#FDD986",
//       300: "#FBB453",
//       400: "#F59E0B", // Golden Yellow (Default)
//       500: "#D97706", // Amber (Dark)
//       600: "#B45309", // Dark Amber
//     },
//     accent: {
//       50: "#EAF7ED", // Light Mint (light equivalent)
//       100: "#C3EFC9",
//       200: "#96E3A3",
//       300: "#63D877",
//       400: "#22C55E", // Vibrant Green (Default)
//       500: "#15803D", // Deep Green (Dark)
//       600: "#0B5E2A", // Darker Forest Green
//     },
//     textCl: {
//       50: "#E5E7EB", // Soft White (Dark mode)
//       100: "#F9FAFB", // Near White
//       200: "#D1D5DB", // Light Gray
//       300: "#6B7280", // Medium Gray
//       400: "#4B5563", // Dark Gray
//       500: "#111827", // Standard Dark Text (Default)
//       600: "#374151", // Grayish Black for Light Mode
//     },
//     backgroundCl: {
//       50: "#F9FAFB", // Subtle Off-White
//       100: "#F3F4F6",
//       200: "#E5E7EB",
//       300: "#9CA3AF",
//       400: "#4B5563", // Darker Gray
//       500: "#1F2937", // Charcoal Gray (Dark Mode)
//       600: "#111827", // Almost Black
//     },
//     successCl: {
//       50: "#DCFCE7", // Soft Green
//       100: "#BBF7D0",
//       200: "#86EFAC",
//       300: "#4ADE80",
//       400: "#16A34A", // Bright Green (Default)
//       500: "#166534", // Forest Green (Dark)
//     },
//     errorCl: {
//       50: "#FEE2E2", // Soft Red
//       100: "#FCA5A5",
//       200: "#F87171",
//       300: "#EF4444", // Bright Red (Default)
//       400: "#DC2626", // Vivid Red
//       500: "#9B2222", // Darker Red
//     },
//     warningCl: {
//       50: "#FFFBEB", // Pale Yellow
//       100: "#FEF3C7",
//       200: "#FDE68A",
//       300: "#FBBF24",
//       400: "#F59E0B", // Bold Yellow (Default)
//       500: "#D97706", // Amber (Dark)
//       600: "#7B341E", // Burnt Orange (Dark)
//     },
//   },
//   fonts: {
//     heading: `'Poppins', sans-serif`,
//     body: `'Roboto', sans-serif`,
//   },
//   styles: {
//     global: {
//       body: {
//         bg: "backgroundCl.500", // Using background colors dynamically
//         color: "textCl.50",
//       },
//     },
//   },
// });

// export default customTheme;

import { extendTheme } from "@mui/joy/styles";

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#6200ea" },
        neutral: { main: "#333" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#bb86fc" },
        neutral: { main: "#fff" },
      },
    },
  },
  fontFamily: {
    body: "'Noto Sans Georgian', sans-serif",
  },
});
export default customTheme;
