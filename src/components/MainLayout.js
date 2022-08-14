/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Card from "react-bootstrap/Card";

const drawerWidth = 240;

const MainLayout = ({ children, title = "title" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [openErrorToast, setOpenErrorToast] = React.useState(false);
  const logout = useStoreActions((actions) => actions.logout);
  const successToast = useStoreState((state) => state.successToast);
  const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast);
  const errorToast = useStoreState((state) => state.errorToast);
  const setErrorToast = useStoreActions((actions) => actions.setErrorToast);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  React.useEffect(() => {
    if (successToast) {
      setOpenSuccessToast(true);

      setTimeout(() => {
        setOpenSuccessToast(false);
        setSuccessToast(null);
      }, 3000);
    }
  }, [successToast]);

  React.useEffect(() => {
    if (errorToast) {
      setOpenErrorToast(true);

      setTimeout(() => {
        setOpenErrorToast(false);
        setErrorToast(null);
      }, 3000);
    }
  }, [errorToast]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#eeeeee",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <div className="ms-auto me-3">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              // color="#06113c"
            >
              <AccountCircle style={{ fill: "#06113c" }} />
            </IconButton>
            <p
              className="d-inline-block text-secondary"
              style={{ cursor: "pointer" }}
              onClick={handleMenu}
            >
              Admin
            </p>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, pt: 10 }}
      >
        {openSuccessToast && (
          <div className="alert alert-success" role="alert">
            {successToast}
          </div>
        )}
        {openErrorToast && (
          <div className="alert alert-danger" role="alert">
            {errorToast}
          </div>
        )}
        <h3 className="mb-5">{title}</h3>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body className="pb-5">{children}</Card.Body>
        </Card>
      </Box>
    </Box>
  );
};

export default MainLayout;
