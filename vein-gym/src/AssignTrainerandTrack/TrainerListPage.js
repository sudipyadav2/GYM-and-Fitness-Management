import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TrainerListPage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "trainers"));
      setTrainers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <Container sx={{ py: 10 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 700, textAlign: "center", mb: 5 }}
      >
        Meet Our Trainers
      </Typography>

      <Grid container spacing={4}>
        {trainers.length === 0 ? (
          <Typography sx={{ textAlign: "center", width: "100%", color: "#aaa" }}>
            No trainers added yet.
          </Typography>
        ) : (
          trainers.map((t) => (
            <Grid item xs={12} sm={6} md={4} key={t.id}>
              <Link
                to={`/trainer/${t.id}`}
                style={{ textDecoration: "none" }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                    }
                  }}
                >
                  <Avatar
                    src={t.photoURL || ""}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "0 auto",
                      border: "3px solid #00e5ff",
                      mb: 2
                    }}
                  />

                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t.name}
                  </Typography>

                  <Typography sx={{ mt: 1, color: "#B3B3B3" }}>
                    {(t.skills || []).join(" • ") ||
                      "Strength • Conditioning • Mobility"}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "#999", fontStyle: "italic" }}
                    >
                      {t.experience
                        ? `${t.experience} years experience`
                        : "Experienced Trainer"}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
