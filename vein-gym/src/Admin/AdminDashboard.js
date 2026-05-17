import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      {/* HEADER */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #00e5ff, #0077ff)",
          padding: "40px",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          mb: 5,
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Welcome back, Admin!.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            background: "white",
            color: "#0077ff",
            fontWeight: "bold",
            "&:hover": { background: "#f0f0f0" }
          }}
          onClick={() => signOut(auth)}
        >
          Logout
        </Button>
      </Box>

      {/* GRID OF ADMIN FEATURES */}
      <Grid container spacing={4}>
        {/* Categories */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <CategoryIcon sx={{ fontSize: 50, color: "#0077ff" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Manage Categories
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Add, edit and organize class categories
            </Typography>
            <Button
              component={Link}
              to="/admin/class-categories"
              variant="contained"
              sx={{ background: "#0077ff" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Classes */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <FitnessCenterIcon sx={{ fontSize: 50, color: "#00bfa5" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Manage Classes
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Create and update gym classes
            </Typography>
            <Button
              component={Link}
              to="/admin/classes"
              variant="contained"
              sx={{ background: "#00bfa5" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Schedule */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <EventIcon sx={{ fontSize: 50, color: "#ff9800" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Manage Schedule
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Set class dates and times
            </Typography>
            <Button
              component={Link}
              to="/admin/schedule"
              variant="contained"
              sx={{ background: "#ff9800" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <GroupIcon sx={{ fontSize: 50, color: "#9c27b0" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Attendance
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Track class attendance
            </Typography>
            <Button
              component={Link}
              to="/admin/attendance"
              variant="contained"
              sx={{ background: "#9c27b0" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: "15px",
              textAlign: "center",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)" }
            }}
          >
            <NotificationsIcon sx={{ fontSize: 50, color: "#e91e63" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Notifications
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              View and manage alerts
            </Typography>
            <Button
              component={Link}
              to="/admin/notifications"
              variant="contained"
              sx={{ background: "#e91e63" }}
            >
              Open
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
