import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import { useLocation, useNavigate } from "react-router-dom";

const TABS = [
  { label: "All Notifications", path: "/", icon: <NotificationsIcon fontSize="small" /> },
  { label: "Priority Inbox", path: "/priority", icon: <StarIcon fontSize="small" /> },
];

export function Layout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tabValue = TABS.findIndex((t) => t.path === pathname) ?? 0;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: "white", color: "text.primary" }}>
        <Toolbar sx={{ gap: 1 }}>
          <NotificationsIcon color="primary" />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Campus Notifications
          </Typography>
        </Toolbar>
        <Tabs
          value={tabValue === -1 ? 0 : tabValue}
          onChange={(_, i) => navigate(TABS[i].path)}
          sx={{ px: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          {TABS.map((t) => (
            <Tab key={t.path} label={t.label} icon={t.icon} iconPosition="start" sx={{ textTransform: "none", minHeight: 48 }} />
          ))}
        </Tabs>
      </AppBar>
      <Box sx={{ maxWidth: 760, mx: "auto", px: 2, py: 4 }}>
        {children}
      </Box>
    </Box>
  );
}
