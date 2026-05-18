import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Chip
} from "@mui/material";

export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "membershipPlans"));
      setPlans(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    load();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          mb: 4,
          color: "#00E5FF"
        }}
      >
        Choose Your Membership
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 4
        }}
      >
        {plans.map(plan => (
          <Paper
            key={plan.id}
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,229,255,0.2)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-8px)",
                borderColor: "#00E5FF"
              }
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#fff" }}>
              {plan.name}
            </Typography>

            <Typography
              variant="h3"
              sx={{ fontWeight: 900, mt: 1, color: "#00E5FF" }}
            >
              £{plan.price}
            </Typography>

            <Box sx={{ mt: 2 }}>
              {plan.features.map((f, i) => (
                <Chip
                  key={i}
                  label={f}
                  sx={{
                    m: 0.5,
                    background: "rgba(0,229,255,0.15)",
                    color: "#00E5FF"
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                background: "#00E5FF",
                color: "#000",
                fontWeight: 700,
                borderRadius: "12px",
                "&:hover": { background: "#00BBD4" }
              }}
            >
              Subscribe
            </Button>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
