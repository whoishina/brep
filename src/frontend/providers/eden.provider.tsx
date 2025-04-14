/* eslint-disable react-refresh/only-export-components */
import type { Backend } from "#/index";
import { edenConfig } from "@/config/eden.config";
import { treaty, Treaty } from "@elysiajs/eden";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";

export type EdenType = Treaty.Create<Backend>;
const EdenContext = createContext<EdenType | undefined>(undefined);

// Custom hook to use Eden context
export const useEden = () => {
  const context = useContext(EdenContext);
  if (context === undefined) {
    throw new Error("useEden must be used within an AppApiProvider");
  }
  return context;
};

export default function AppApiProvider({ children }: PropsWithChildren) {
  const options: Treaty.Config = useMemo(
    () => ({
      async onRequest(_path, options) {
        if (options.method !== "options") {
          return {
            headers: {
              // Add any necessary headers here
            },
          };
        }
        return options;
      },
    }),
    []
  );

  const api = useMemo(
    () => treaty<Backend>(edenConfig.backendUrl, options),
    [options]
  );

  return <EdenContext.Provider value={api}>{children}</EdenContext.Provider>;
}
