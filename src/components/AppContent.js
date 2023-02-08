import React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "../routes";
import { Box, Stack } from "@mui/material";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    width: "90vw",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      minWidth: "80vw",
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // padding: theme.spacing(0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  // justifyContent: "flex-start",
}));

const AppContent = ({ open, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Main open={open}>
        <DrawerHeader />
        <Box bgcolor="#dfe7f2" sx={{ overflowY: "hidden" }} >
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="sign-in" replace />} />
          </Routes>
        </Box>
      </Main>
    </ThemeProvider>
  );
};

export default AppContent;
