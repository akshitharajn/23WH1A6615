import { useState } from "react";
import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { usePriorityNotifications } from "../hooks/useNotifications";

export function PriorityInboxPage() {
  const [type, setType] = useState("All");
  const { notifications, loading, error } = usePriorityNotifications(10);

  const displayed = type === "All" ? notifications : notifications.filter((n) => n.Type === type);

  return (
    <>
      <Typography variant="h5" fontWeight={700}>Priority Inbox</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Top 10 notifications ranked by importance and recency
      </Typography>

      <NotificationFilter value={type} onChange={(v) => v && setType(v)} />

      <Box mt={3}>
        {loading && <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>}
        {!loading && error && <Alert severity="error">Failed to load: {error}</Alert>}
        {!loading && !error && displayed.length === 0 && <Alert severity="info">No notifications found</Alert>}
        {!loading && !error && displayed.length > 0 && (
          <Stack spacing={1.5}>
            {displayed.map((n) => <NotificationCard key={n.ID} notification={n} />)}
          </Stack>
        )}
      </Box>
    </>
  );
}
