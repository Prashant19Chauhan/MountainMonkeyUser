"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { hydrateAuth } from "./userSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Run hydration inside client mount to ensure server/client HTML structures align perfectly
    store.dispatch(hydrateAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
