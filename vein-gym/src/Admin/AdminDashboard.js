import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListIcon from "@mui/icons-material/List";
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
          Welcome back, Admin!
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
          <Paper elevation={4} sx={tileStyle}>
            <CategoryIcon sx={iconBlue} />
            <TileTitle>Manage Categories</TileTitle>
            <TileDesc>Add, edit and organize class categories</TileDesc>
            <TileButton to="/admin/class-categories" color="#0077ff" />
          </Paper>
        </Grid>

        {/* Classes */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <FitnessCenterIcon sx={iconGreen} />
            <TileTitle>Manage Classes</TileTitle>
            <TileDesc>Create and update gym classes</TileDesc>
            <TileButton to="/admin/classes" color="#00bfa5" />
          </Paper>
        </Grid>

        {/* Schedule */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <EventIcon sx={iconOrange} />
            <TileTitle>Manage Schedule</TileTitle>
            <TileDesc>Set class dates and times</TileDesc>
            <TileButton to="/admin/class-schedule" color="#ff9800" />
          </Paper>
        </Grid>

        {/* Attendance */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <GroupIcon sx={iconPurple} />
            <TileTitle>Attendance</TileTitle>
            <TileDesc>Track class attendance</TileDesc>
            <TileButton to="/attendance" color="#9c27b0" />
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <NotificationsIcon sx={iconPink} />
            <TileTitle>Notifications</TileTitle>
            <TileDesc>View and manage alerts</TileDesc>
            <TileButton to="/notifications" color="#e91e63" />
          </Paper>
        </Grid>

        {/* ADD TRAINER */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <PersonAddIcon sx={iconBlue} />
            <TileTitle>Add Trainer</TileTitle>
            <TileDesc>Add new trainers to the system</TileDesc>
            <TileButton to="/admin/add-trainer" color="#0077ff" />
          </Paper>
        </Grid>

        {/* TRAINER LIST */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <ListIcon sx={iconGreen} />
            <TileTitle>Trainer List</TileTitle>
            <TileDesc>View all trainers</TileDesc>
            <TileButton to="/trainers" color="#00bfa5" />
          </Paper>
        </Grid>

        {/* ASSIGN TRAINER */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <AssignmentIndIcon sx={iconOrange} />
            <TileTitle>Assign Trainer</TileTitle>
            <TileDesc>Assign trainers to classes</TileDesc>
            <TileButton to="/admin/assign-trainer" color="#ff9800" />
          </Paper>
        </Grid>

        {/* TRAINER AVAILABILITY */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <CalendarMonthIcon sx={iconPurple} />
            <TileTitle>Trainer Availability</TileTitle>
            <TileDesc>Manage trainer availability</TileDesc>
            <TileButton to="/admin/trainer-availability" color="#9c27b0" />
          </Paper>
        </Grid>

        {/* TRAINER LEAVE */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <AirlineSeatReclineNormalIcon sx={iconPink} />
            <TileTitle>Trainer Leave</TileTitle>
            <TileDesc>Approve or reject trainer leave</TileDesc>
            <TileButton to="/admin/trainer-leave" color="#e91e63" />
          </Paper>
        </Grid>

        {/* TRACK TRAINER HOURS */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={tileStyle}>
            <AccessTimeIcon sx={iconBlue} />
            <TileTitle>Track Trainer Hours</TileTitle>
            <TileDesc>Monitor trainer working hours</TileDesc>
            <TileButton to="/admin/trainer-hours" color="#0077ff" />
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}

/* --- Reusable Styles --- */
const tileStyle = {
  p: 3,
  borderRadius: "15px",
  textAlign: "center",
  transition: "0.3s",
  "&:hover": { transform: "translateY(-5px)" }
};

const TileTitle = ({ children }) => (
  <Typography variant="h6" sx={{ mt: 2 }}>
    {children}
  </Typography>
);

const TileDesc = ({ children }) => (
  <Typography variant="body2" sx={{ mb: 2 }}>
    {children}
  </Typography>
);

const TileButton = ({ to, color }) => (
  <Button component={Link} to={to} variant="contained" sx={{ background: color }}>
    Open
  </Button>
);

/* Icon Colors */
const iconBlue = { fontSize: 50, color: "#0077ff" };
const iconGreen = { fontSize: 50, color: "#00bfa5" };
const iconOrange = { fontSize: 50, color: "#ff9800" };
const iconPurple = { fontSize: 50, color: "#9c27b0" };
const iconPink = { fontSize: 50, color: "#e91e63" };
