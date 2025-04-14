import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/config/react-query.config";
import RouterProvider from "@/providers/router.provider";
import { QueryClientProvider } from "@tanstack/react-query";
import AppApiProvider from "./providers/eden.provider";
import { ThemeProvider } from "./providers/theme.provider";

function App() {
  // Return app
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <AppApiProvider>
            <RouterProvider />
          </AppApiProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
