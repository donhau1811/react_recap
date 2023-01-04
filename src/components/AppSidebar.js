import React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ListItem1 = styled(ListItem)(({ theme }) => ({
  color: theme.palette.listItem.main,
  "&:hover": {
    backgroundColor: theme.palette.background.default,
  },
}));

const ListItemIcon1 = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.listItem.main,
}));

const Divider1 = styled(Divider)(({ theme, handleDrawerClose }) => ({
  background: theme.palette.background.default,
}));

const AppSidebar = ({open, handleDrawerClose, theme}) => {
  return (
    <ThemeProvider theme={theme}>
         <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.sidebar.main,
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" spacing={4}>
          <img
            width="90px"
            height="90px"
            src={require("../assets/logo/logo.svg").default}
            alt="REE LOGO"
          />

          <IconButton
            sx={{ color: theme.palette.background.default }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltr" ? (
              <ArrowBackIosNewTwoToneIcon fontSize="small" />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider1 />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem1 key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon1>
                {index % 2 === 0 ? (
                  <InboxIcon fontSize="large" />
                ) : (
                  <MailIcon fontSize="large" />
                )}
              </ListItemIcon1>
              <ListItemText primary={text} fontSize="large" />
            </ListItemButton>
          </ListItem1>
        ))}
      </List>
      <Divider1 />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem1 key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon1>
                {index % 2 === 0 ? (
                  <InboxIcon fontSize="large" />
                ) : (
                  <MailIcon fontSize="large" />
                )}
              </ListItemIcon1>
              <ListItemText primary={text} fontSize="large" />
            </ListItemButton>
          </ListItem1>
        ))}
      </List>
    </Drawer>
    </ThemeProvider>
   
  );
};

export default AppSidebar;
