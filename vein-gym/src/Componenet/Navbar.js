import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* PROFILE MENU */
  const [profileMenu, setProfileMenu] = useState(null);
  const openProfile = Boolean(profileMenu);

  const handleProfileOpen = (e) => setProfileMenu(e.currentTarget);
  const handleProfileClose = () => setProfileMenu(null);

  /* NOTIFICATION MENU */
  const [notifMenu, setNotifMenu] = useState(null);
  const openNotif = Boolean(notifMenu);

  const handleNotifOpen = (e) => setNotifMenu(e.currentTarget);
  const handleNotifClose = () => setNotifMenu(null);

  /* LOGOUT */
  const handleLogout = () => {
    logout();
    handleProfileClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Vein Gym
        </Typography>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Button component={RouterLink} to="/" sx={{ color: "white" }}>
            Home
          </Button>

          <Button component={RouterLink} to="/classes" sx={{ color: "white" }}>
            Classes
          </Button>

          <Button component={RouterLink} to="/dashboard" sx={{ color: "white" }}>
            Dashboard
          </Button>

          
          {!user ? (
            <>
            <Button
              component={RouterLink}
              to="/login"
              sx={{
                background: "#00e5ff",
                color: "black",
                fontWeight: 700,
                paddingX: 3,
                borderRadius: "25px",
                "&:hover": { background: "#00bcd4" }
              }}
            >
              Login
            </Button>

        
            <Button
              component={RouterLink}
              to="/admin/login"
              sx={{
                background: "#ff1744",
                color: "white",
                fontWeight: 700,
                paddingX: 3,
                borderRadius: "25px",
                ml: 2,
                "&:hover": { background: "#d50000" }
      }}
    >
      Admin Login
    </Button>
  
          </>
          ) : (
            <>
             
              <IconButton onClick={handleNotifOpen} sx={{ color: "white" }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                anchorEl={notifMenu}
                open={openNotif}
                onClose={handleNotifClose}
                PaperProps={{
                  sx: {
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(10px)",
                    color: "white"
                  }
                }}
              >
                <MenuItem onClick={handleNotifClose}>New class added</MenuItem>
                <MenuItem onClick={handleNotifClose}>Membership reminder</MenuItem>
                <MenuItem onClick={handleNotifClose}>Trainer message</MenuItem>
              </Menu>

              {/* PROFILE AVATAR */}
              <IconButton onClick={handleProfileOpen}>
                <Avatar
                  src={user.photoURL || ""}
                  sx={{
                    bgcolor: "#00e5ff",
                    color: "black",
                    fontWeight: 700
                  }}
                >
                  {!user.photoURL && user.email?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              {/* PROFILE DROPDOWN */}
              <Menu
                anchorEl={profileMenu}
                open={openProfile}
                onClose={handleProfileClose}
                PaperProps={{
                  sx: {
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(10px)",
                    color: "white"
                  }
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    navigate("/dashboard");
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    navigate("/classes");
                  }}
                >
                  My Classes
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
}
