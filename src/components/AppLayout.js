import React from "react";
import { createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppContent from "./AppContent";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    sidebar: {
      main: "#042B52",
    },
    font: {
      main: "#212121",
    },
    listItem: {
      main: "#718fab",
    },
  },

});

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", fontFamily: theme.typography.fontFamily }}>
      <AppHeader
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        theme={theme}
      />
      <AppSidebar
        handleDrawerClose={handleDrawerClose}
        open={open}
        theme={theme}
      />
      <AppContent open={open} theme={theme} />
    </Box>
  );
}
