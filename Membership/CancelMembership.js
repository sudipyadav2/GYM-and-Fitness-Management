import { Container, Paper, Typography, Button } from "@mui/material";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function CancelMembership() {
  const { user } = useAuth();

  const handleCancel = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      "membership.status": "cancelled"
    });
    alert("Membership cancelled. You will keep access until end of billing period.");
  };

  return (
    <Container sx={{ mt: 10, maxWidth: "700px !important" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(145deg,#111827,#020617)",
          color: "white",
          border: "1px solid rgba(255,23,68,0.4)"
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight={800} mb={2}>
          Cancel Membership
        </Typography>
        <Typography mb={3}>
          Your access will remain active until the end of your current billing
          period. After that, you will lose access to Vein Gym premium features.
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ fontWeight: 700 }}
          onClick={handleCancel}
        >
          Confirm Cancel Membership
        </Button>
      </Paper>
    </Container>
  );
}
