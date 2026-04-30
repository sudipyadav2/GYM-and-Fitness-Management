import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Parallax from "../ParallaxTheme/Parallax";
import Trad from "../BackgroundImage/Trad.jpeg";
import R from "../BackgroundImage/R.jpg";
import Girl from "../BackgroundImage/Girl.jpg";
import Navbar from "../Componenet/Navbar";
import Footer from "../Componenet/Footer";

export default function Homepage() {
  return (
    <>
     
      <Parallax image={R} height="100vh">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "white",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)"
          }}
        >
          Transform Your Body
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mt: 2,
            color: "#B3B3B3",
            maxWidth: "600px",
            margin: "0 auto"
          }}
        >
          Premium fitness experience with world‑class trainers, modern equipment,
          and cinematic atmosphere.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1.1rem" }}
          href="/register"
        >
          Join Now
        </Button>
      </Parallax>

      
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
          Why Choose Us
        </Typography>

        <Grid container spacing={4}>
          {[
            { title: "Modern Equipment", desc: "Train with the latest premium machines." },
            { title: "Expert Trainers", desc: "Certified professionals guiding your journey." },
            { title: "Luxury Environment", desc: "Cinematic lighting and premium ambience." }
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ mt: 1, color: "#B3B3B3" }}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

   
      <Parallax image={Girl} height="70vh">
        <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
          Explore Our Classes
        </Typography>
        <Typography sx={{ mt: 2, color: "#B3B3B3" }}>
          Yoga • HIIT • Strength • Cardio • Boxing
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4 }}
          href="/classes"
        >
          View Classes
        </Button>
      </Parallax>

     
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
          Meet Our Trainers
        </Typography>

        <Grid container spacing={4}>
          {[1, 2, 3].map((trainer) => (
            <Grid item xs={12} md={4} key={trainer}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Trainer {trainer}
                </Typography>
                <Typography sx={{ mt: 1, color: "#B3B3B3" }}>
                  Strength • Conditioning • Mobility
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      
      <Parallax image={Trad} height="60vh">
        <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
          Train With the Best
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          href="/trainers"
        >
          Meet Trainers
        </Button>
      </Parallax>

    
      <Box sx={{ py: 4, textAlign: "center", background: "#111" }}>
        <Typography sx={{ color: "#B3B3B3" }}>
          © {new Date().getFullYear()}  Gym. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
