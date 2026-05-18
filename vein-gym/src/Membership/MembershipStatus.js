import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container, Paper, Typography, Box, Chip, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MembershipStatus() {
  const { user } = useAuth();
  const [membership, setMembership] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setMembership(snap.data().membership || null);
    };
    if (user) load();
  }, [user]);

  if (!membership)
    return (
      <Container sx={{ mt: 10 }}>
        <Typography color="white" mb={2}>
          No active membership.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/membership/plans")}
        >
          View Plans
        </Button>
      </Container>
    );

  return (
    <Container sx={{ mt: 10, maxWidth: "700px !important" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(145deg,#020617,#0B1120)",
          color: "white",
          border: "1px solid rgba(0,229,255,0.25)"
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight={800} mb={2}>
          Membership Status
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Typography variant="h5" fontWeight={700}>
            {membership.planName}
          </Typography>
          <Chip
            label={membership.status?.toUpperCase()}
            sx={{
              background:
                membership.status === "active" ? "#00E676" : "#FF1744",
              color: "#000",
              fontWeight: 700
            }}
          />
        </Box>

        <Typography>Price: £{membership.price} / month</Typography>
        <Typography>Renews on: {membership.renewalDate}</Typography>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ background: "#00E5FF", color: "#000", fontWeight: 700 }}
            onClick={() => navigate("/membership/upgrade")}
          >
            Upgrade
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#FF1744", color: "#FF1744" }}
            onClick={() => navigate("/membership/cancel")}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: "#00E5FF", color: "#00E5FF" }}
            onClick={() => navigate("/membership/billing")}
          >
            Billing History
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
