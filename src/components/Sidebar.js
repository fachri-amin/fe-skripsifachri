import React from "react";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import menu from "../config/menu";

const drawerWidth = 240;

const Sidebar = () => {
  const logout = useStoreActions((actions) => actions.logout);
  const navigate = useNavigate();
  const [active, setActive] = React.useState("");
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  React.useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#06113c",
          color: "#eeeeee",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <h3>Dzakir Motor</h3>
      </Toolbar>
      <Divider sx={{ bgcolor: "#eeeeee" }} />
      <List sx={{ mt: 5 }}>
        {menu.map((item, index) => (
          <ListItem
            key={item.text}
            disablePadding
            onClick={() => {
              navigate(item.to);
              setActive(item.to);
            }}
          >
            <ListItemButton sx={active === item.to ? { color: "#ff8c32" } : {}}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"logout"} disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutRoundedIcon style={{ fill: "#eeeeee" }} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
