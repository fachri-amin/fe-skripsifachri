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
import { Modal, Button } from "react-bootstrap";
import menu from "../config/menu";

const drawerWidth = 240;

const Sidebar = () => {
  const logout = useStoreActions((actions) => actions.logout);
  const navigate = useNavigate();
  const [active, setActive] = React.useState("");
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda ingin logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button className="btn-primary" onClick={handleLogout}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
      <Toolbar>
        <h3>Dzakir Motor</h3>
      </Toolbar>
      <Divider sx={{ bgcolor: "#eeeeee" }} />
      <List sx={{ mt: 5 }}>
        {menu.map((item, index) => (
          <ListItem
            sx={active === item.to ? { bgcolor: "#ff8c32" } : {}}
            key={item.text}
            disablePadding
            onClick={() => {
              navigate(item.to);
              setActive(item.to);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={"logout"} disablePadding onClick={handleShow}>
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
