import { useState, useEffect } from "react";
import { fetchNotifications, getTopNPriority } from "../api/notifications";
import { createLogger } from "../../../logging-middleware/logger";

const logger = createLogger("useNotifications");
const PAGE_SIZE = 10;

// For all notifications with client-side pagination and type filter
export function useNotifications({ page = 1, type = "All" } = {}) {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNotifications({ notification_type: type })
      .then((data) => {
        logger.info("Loaded", { count: data.notifications?.length ?? 0 });
        setAll(data.notifications || []);
      })
      .catch((err) => {
        logger.error("Failed", { error: err.message });
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [type]);

  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const notifications = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return { notifications, totalPages, loading, error };
}

// For priority inbox - fetches all, returns top N sorted by weight + recency
export function usePriorityNotifications(topN = 10) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNotifications()
      .then((data) => {
        const top = getTopNPriority(data.notifications || [], topN);
        logger.info("Priority loaded", { count: top.length });
        setNotifications(top);
      })
      .catch((err) => {
        logger.error("Priority failed", { error: err.message });
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [topN]);

  return { notifications, loading, error };
}
