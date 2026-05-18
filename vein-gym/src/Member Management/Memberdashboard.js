import { useAuth } from "../AuthContext";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Avatar
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const snap = await getDoc(doc(db, "members", user.uid));
      if (snap.exists()) setProfile(snap.data());
    };
    loadProfile();
  }, [user.uid]);

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {/* HEADER WITH PROFILE PICTURE */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #00e5ff, #0077ff)",
          padding: "30px",
          borderRadius: "15px",
          color: "white",
          mb: 5,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 3
        }}
      >
        <Avatar
          src={profile?.photoURL || ""}
          sx={{
            width: 80,
            height: 80,
            border: "3px solid white"
          }}
        />

        <Box>
          <Typography variant="h5" fontWeight="bold">
            Welcome back{profile?.name ? `, ${profile.name}` : ""} 👋
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Manage your classes, track attendance and stay on top of your fitness.
          </Typography>
        </Box>
      </Box>

      {/* FEATURE GRID */}
      <Grid container spacing={4}>
        {/* View Classes */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "15px",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 50, color: "#00bfa5" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              View Classes
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Explore and book available classes.
            </Typography>
            <Button
              component={Link}
              to="/classes"
              variant="contained"
              sx={{ background: "#00bfa5" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* My Registrations */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "15px",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <EventIcon sx={{ fontSize: 50, color: "#ff9800" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              My Registrations
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              See and manage your booked classes.
            </Typography>
            <Button
              component={Link}
              to="/class/attendance"
              variant="contained"
              sx={{ background: "#ff9800" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "15px",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <NotificationsIcon sx={{ fontSize: 50, color: "#e91e63" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Notifications
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Stay updated on your classes.
            </Typography>
            <Button
              component={Link}
              to="/class/notifications"
              variant="contained"
              sx={{ background: "#e91e63" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Profile */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "15px",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 50, color: "#9c27b0" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Profile
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              View and edit your profile.
            </Typography>
            <Button
              component={Link}
              to="/member/profile"
              variant="contained"
              sx={{ background: "#9c27b0" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* LOGOUT */}
      <Button
        variant="outlined"
        sx={{ mt: 4, borderColor: "red", color: "red" }}
        onClick={() => signOut(auth)}
      >
        Logout
      </Button>
    </Container>
  );
}
