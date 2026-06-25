import { createLogger } from "../../../logging-middleware/logger.js";

const logger = createLogger("NotificationAPI");

const WEIGHTS = { Placement: 3, Result: 2, Event: 1 };
const API_BASE = "/evaluation-service/notifications";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3doMWE2NjE1QGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsImV4cCI6MTc4MjM4MjMwOSwiaWF0IjoxNzgyMzgxNDA5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMThlNDIyNDMtNjczNy00N2ZlLTg1NmMtYWU0MTYxZjI0MzEzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtzaGl0aGEgbmFnYXNhbmkiLCJzdWIiOiJjYjMzMTFjOC04NzE1LTRhOWMtOGU3Mi1iYmZjYjYzYzg0NTkifSwiZW1haWwiOiIyM3doMWE2NjE1QGJ2cml0aHlkZXJhYmFkLmVkdS5pbiIsIm5hbWUiOiJha3NoaXRoYSBuYWdhc2FuaSIsInJvbGxObyI6IjIzd2gxYTY2MTUiLCJhY2Nlc3NDb2RlIjoiYWhYanZwIiwiY2xpZW50SUQiOiJjYjMzMTFjOC04NzE1LTRhOWMtOGU3Mi1iYmZjYjYzYzg0NTkiLCJjbGllbnRTZWNyZXQiOiJ5V1N2bkRHc3hKVUJIR1RjIn0.1jx28z1HNe8gJpJfeOJZE6CZXrvKOcaMSouxPGBPakA";

export const priority = (n) =>
  (WEIGHTS[n.Type] || 0) * 1e15 + new Date(n.Timestamp.replace(" ", "T")).getTime();

export function getTopNPriority(notifications, n = 10) {
  logger.info("Computing top-N priority", { total: notifications.length, n });
  return [...notifications].sort((a, b) => priority(b) - priority(a)).slice(0, n);
}

export async function fetchNotifications({ notification_type } = {}) {
  const params = new URLSearchParams();
  if (notification_type && notification_type !== "All") {
    params.set("notification_type", notification_type);
  }
  const url = params.toString() ? `${API_BASE}?${params}` : API_BASE;
  logger.info("Fetching notifications", { url });

  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) {
      logger.error("API error", { status: res.status });
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    logger.info("Fetched successfully", { count: data.notifications?.length ?? 0 });
    return data;
  } catch (err) {
    logger.error("Fetch failed", { error: err.message });
    throw err;
  }
}
