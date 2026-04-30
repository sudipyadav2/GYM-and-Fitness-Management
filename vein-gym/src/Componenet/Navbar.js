import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-scroll";

export default function Navbar() {
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
        
        {/* LOGO / BRAND */}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Premium Gym
        </Typography>

        {/* NAV LINKS */}
        <Box>
          <Button color="inherit">
            <Link to="hero" smooth={true} duration={600} offset={-70}>
              Home
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="features" smooth={true} duration={600} offset={-70}>
              Features
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="classes" smooth={true} duration={600} offset={-70}>
              Classes
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="trainers" smooth={true} duration={600} offset={-70}>
              Trainers
            </Link>
          </Button>

          <Button color="inherit">
            <Link to="footer" smooth={true} duration={600} offset={-70}>
              Contact
            </Link>
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
