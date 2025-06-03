import { createRoot } from "react-dom/client";

// Importing the styles
import "./index.css";
import "./styles/userlistPageStyles.css";
import "./styles/mantineStyles.css";
import "./styles/toaster.css";
import "./styles/scrollbarStyles.css";

// Importing the router
import { router } from "./Router.jsx";
import { RouterProvider } from "react-router";

// Importing Mantine CSS
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";

// Importing Mantine Provider
import { MantineProvider, createTheme } from "@mantine/core";
// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Creating a new Query Client Instance
const queryClient = new QueryClient();

const theme = createTheme({
  cursorType: "pointer",
});

createRoot(document.getElementById("root")).render(
  // Mantine Provider
  <MantineProvider theme={theme}>
    {/* Query Provider */}
    <QueryClientProvider client={queryClient}>
      {/* Router Provider */}
      <RouterProvider router={router} />
    </QueryClientProvider>
    {/* Toast Provider */}
    <Toaster
      style={{
        fontFamily: "Plus Jakarta Sans",
      }}
      duration={3000}
      richColors={true}
    />
  </MantineProvider>
);
