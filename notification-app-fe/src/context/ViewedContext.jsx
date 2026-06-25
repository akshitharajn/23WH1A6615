import { createContext, useContext, useState } from "react";
import { createLogger } from "../../../logging-middleware/logger";

const logger = createLogger("ViewedContext");
const ViewedContext = createContext(null);

function loadViewed() {
  try {
    return new Set(JSON.parse(localStorage.getItem("viewed") || "[]"));
  } catch {
    return new Set();
  }
}

export function ViewedProvider({ children }) {
  const [viewed, setViewed] = useState(loadViewed);

  function markViewed(id) {
    if (viewed.has(id)) return;
    const next = new Set(viewed);
    next.add(id);
    localStorage.setItem("viewed", JSON.stringify([...next]));
    logger.debug("Marked viewed", { id });
    setViewed(next);
  }

  return (
    <ViewedContext.Provider value={{ isViewed: (id) => viewed.has(id), markViewed }}>
      {children}
    </ViewedContext.Provider>
  );
}

export const useViewed = () => useContext(ViewedContext);
