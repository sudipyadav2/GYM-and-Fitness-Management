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
  const { user, role, logout } = useAuth();
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

  /* MEMBERSHIP MENU */
  const [membershipMenu, setMembershipMenu] = useState(null);
  const openMembership = Boolean(membershipMenu);
  const handleMembershipOpen = (e) => setMembershipMenu(e.currentTarget);
  const handleMembershipClose = () => setMembershipMenu(null);

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
        
        {/* LOGO */}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Vein Gym
        </Typography>

        {/* NAVIGATION */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          
          {/* ALWAYS VISIBLE */}
          <Button component={RouterLink} to="/" sx={{ color: "white" }}>
            Home
          </Button>

          {/* ROLE‑BASED NAVIGATION */}
          {!user ? (
            <>
              {/* MEMBER LOGIN */}
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

              {/* ADMIN LOGIN */}
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
          ) : role === "admin" ? (
            <>
              {/* ADMIN NAVIGATION */}
              <Button component={RouterLink} to="/admin/dashboard" sx={{ color: "white" }}>
                Admin Dashboard
              </Button>

              <Button component={RouterLink} to="/admin/class-categories" sx={{ color: "white" }}>
                Categories
              </Button>

              <Button component={RouterLink} to="/admin/classes" sx={{ color: "white" }}>
                Classes
              </Button>

              <Button component={RouterLink} to="/admin/class-schedule" sx={{ color: "white" }}>
                Schedule
              </Button>

              {/* ADMIN MEMBERSHIP MANAGEMENT */}
              <Button component={RouterLink} to="/admin/membership-plans" sx={{ color: "white" }}>
                Membership Plans
              </Button>

              <Button onClick={handleLogout} sx={{ color: "white" }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* MEMBER NAVIGATION */}
              <Button component={RouterLink} to="/classes" sx={{ color: "white" }}>
                Classes
              </Button>

              <Button component={RouterLink} to="/trainers" sx={{ color: "white" }}>
                Trainers
              </Button>

              <Button component={RouterLink} to="/class/attendance" sx={{ color: "white" }}>
                Attendance
              </Button>

              <Button component={RouterLink} to="/class/notifications" sx={{ color: "white" }}>
                Alerts
              </Button>

              {/* MEMBERSHIP DROPDOWN */}
              <Button onClick={handleMembershipOpen} sx={{ color: "white" }}>
                Membership 
              </Button>

              <Menu
                anchorEl={membershipMenu}
                open={openMembership}
                onClose={handleMembershipClose}
                PaperProps={{
                  sx: {
                    background: "rgba(0,0,0,0.85)",
                    backdropFilter: "blur(10px)",
                    color: "white"
                  }
                }}
              >
                <MenuItem onClick={() => { handleMembershipClose(); navigate("/membership/plans"); }}>
                  Membership Plans
                </MenuItem>

                <MenuItem onClick={() => { handleMembershipClose(); navigate("/membership/status"); }}>
                  My Membership
                </MenuItem>

                <MenuItem onClick={() => { handleMembershipClose(); navigate("/membership/upgrade"); }}>
                  Upgrade
                </MenuItem>

                <MenuItem onClick={() => { handleMembershipClose(); navigate("/membership/billing"); }}>
                  Billing History
                </MenuItem>

                <MenuItem onClick={() => { handleMembershipClose(); navigate("/membership/payment"); }}>
                  Payment Method
                </MenuItem>
              </Menu>

              {/* DASHBOARD + PROFILE */}
              <Button component={RouterLink} to="/dashboard" sx={{ color: "white" }}>
                Dashboard
              </Button>

              <Button component={RouterLink} to="/member/profile" sx={{ color: "white" }}>
                Profile
              </Button>

              {/* NOTIFICATIONS */}
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

              {/* PROFILE DROPDOWN */}
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
                <MenuItem onClick={() => { handleProfileClose(); navigate("/member/profile"); }}>
                  Profile
                </MenuItem>

                <MenuItem onClick={() => { handleProfileClose(); navigate("/member/editprofile"); }}>
                  Edit Profile
                </MenuItem>

                <MenuItem onClick={() => { handleProfileClose(); navigate("/member/updateprofile"); }}>
                  Update Picture
                </MenuItem>

                <MenuItem onClick={() => { handleProfileClose(); navigate("/member/deleteaccount"); }}>
                  Delete Account
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
