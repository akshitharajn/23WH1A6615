import { Box, Chip, Paper, Typography } from "@mui/material";
import { useViewed } from "../context/ViewedContext";

const TYPE_COLORS = { Placement: "success", Result: "warning", Event: "info" };

export function NotificationCard({ notification }) {
  const { ID, Type, Message, Timestamp } = notification;
  const { isViewed, markViewed } = useViewed();
  const viewed = isViewed(ID);

  return (
    <Paper
      variant="outlined"
      onClick={() => markViewed(ID)}
      sx={{
        p: 2,
        borderLeft: 4,
        borderColor: `${TYPE_COLORS[Type] || "primary"}.main`,
        cursor: "pointer",
        opacity: viewed ? 0.6 : 1,
        bgcolor: viewed ? "grey.50" : "background.paper",
        transition: "opacity 0.2s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Box display="flex" alignItems="center" gap={1}>
          {!viewed && (
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }} />
          )}
          <Typography variant="subtitle2" fontWeight={viewed ? 400 : 700}>
            {Message}
          </Typography>
        </Box>
        <Chip label={Type} size="small" color={TYPE_COLORS[Type] || "default"} />
      </Box>
      <Typography variant="caption" color="text.disabled">
        {new Date(Timestamp.replace(" ", "T")).toLocaleString()}
      </Typography>
    </Paper>
  );
}
