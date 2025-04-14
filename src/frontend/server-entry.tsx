import { queryClient } from "@/config/react-query.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import HomePage from "./pages/home/home";
import AppApiProvider from "./providers/eden.provider";

export function RenderApp() {
  return (
    // <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <AppApiProvider>
        <HomePage />
      </AppApiProvider>
    </QueryClientProvider>
    // </ThemeProvider>
  );
  // return <RouterProvider />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <RenderApp />
    </StrictMode>
  );
  return { html };
}

export type RenderView = typeof render;
