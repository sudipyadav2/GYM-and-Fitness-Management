import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Parallax from "../ParallaxTheme/Parallax";
import Trad from "../BackgroundImage/Trad.jpeg";
import R from "../BackgroundImage/R.jpg";
import Girl from "../BackgroundImage/Girl.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Homepage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const trainerSnap = await getDocs(collection(db, "trainers"));
      setTrainers(trainerSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <>
      {/* HERO */}
      <Parallax image={R} height="100vh">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "white",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)"
          }}
        >
          Transform Your Body with Vein Gym
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

      {/* WHY CHOOSE US */}
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

      {/* MEMBERSHIP PLANS PARALLAX  */}
      <Parallax image={Girl} height="70vh">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "white",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)"
          }}
        >
          Membership Plans
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#B3B3B3",
            maxWidth: "600px",
            margin: "0 auto"
          }}
        >
          Choose the perfect plan for your fitness journey
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            background: "#00E5FF",
            color: "#000",
            fontWeight: 700,
            borderRadius: "12px",
            "&:hover": { background: "#00BBD4" }
          }}
          href="/membership-plans"
        >
          View Plans
        </Button>
      </Parallax>

      {/* TRAINERS */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}>
          Meet Our Trainers
        </Typography>

        <Grid container spacing={4}>
          {trainers.length === 0 ? (
            <Typography sx={{ textAlign: "center", width: "100%", color: "#aaa" }}>
              No trainers added yet.
            </Typography>
          ) : (
            trainers.slice(0, 3).map((t) => (
              <Grid item xs={12} md={4} key={t.id}>
                <Link to={`/trainer/${t.id}`} style={{ textDecoration: "none" }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { transform: "translateY(-5px)" }
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t.name}
                    </Typography>
                    <Typography sx={{ mt: 1, color: "#B3B3B3" }}>
                      {(t.skills || []).join(" • ") || "Strength • Conditioning • Mobility"}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* FINAL PARALLAX */}
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
    </>
  );
}
