import React from "react";
import { useStoreActions } from "easy-peasy";
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

const drawerWidth = 240;

const MainLayout = ({ children, title = "title" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const logout = useStoreActions((actions) => actions.logout);
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
        <h1>{title}</h1>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
