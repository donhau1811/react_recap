import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Grid, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogout } from "../redux/actions/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MySwal = withReactContent(Swal);

const AppHeader = ({ open, handleDrawerOpen, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();

    const result = await MySwal.fire({
      title: "Xác nhận đăng suất",
      html: "Bạn có muốn thoát ứng dụng không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      customClass: {
        confirmButton: "btn btn-primary mx-2 p-10",
        cancelButton: "btn btn-outline-secondary "
      },
      buttonsStyling: false
    });
    if (result.value) {
      dispatch(handleLogout());
      navigate("/sign-in");
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "background.default",
        color: "common.black",
      }}
      position="fixed"
      open={open}
    >
      <Toolbar sx={{ display: "flex" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{ ml: -3, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Grid container>
          <Grid item xs="11"></Grid>
          <Grid item xs>
            <IconButton
              color="inherit"
              aria-label="log out"
              onClick={logoutUser}
            >
              <LogoutIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
