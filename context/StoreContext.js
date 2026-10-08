"use client";

import { createContext, useContext, useMemo, useState } from "react";

const StoreContext = createContext(null);

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

export default function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const value = useMemo(() => ({ cart, setCart }), [cart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
