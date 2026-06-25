import { useState } from "react";
import { Alert, Box, CircularProgress, Pagination, Stack, Typography } from "@mui/material";
import { NotificationCard } from "../components/NotificationCard";
import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function AllNotificationsPage() {
  const [type, setType] = useState("All");
  const [page, setPage] = useState(1);
  const { notifications, totalPages, loading, error } = useNotifications({ page, type });

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={3}>All Notifications</Typography>

      <NotificationFilter value={type} onChange={(v) => { if (v) { setType(v); setPage(1); } }} />

      <Box mt={3}>
        {loading && <Box display="flex" justifyContent="center" py={6}><CircularProgress /></Box>}
        {!loading && error && <Alert severity="error">Failed to load: {error}</Alert>}
        {!loading && !error && notifications.length === 0 && <Alert severity="info">No notifications found</Alert>}
        {!loading && !error && notifications.length > 0 && (
          <>
            <Stack spacing={1.5} mb={4}>
              {notifications.map((n) => <NotificationCard key={n.ID} notification={n} />)}
            </Stack>
            <Box display="flex" justifyContent="center">
              <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" shape="rounded" />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
