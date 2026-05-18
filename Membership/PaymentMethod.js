import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function PaymentMethod() {
  const { user } = useAuth();
  const [card, setCard] = useState({ last4: "", brand: "", name: "" });

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().paymentMethod) {
        setCard(snap.data().paymentMethod);
      }
    };
    if (user) load();
  }, [user]);

  const handleChange = (e) =>
    setCard({ ...card, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      paymentMethod: card
    });
    alert("Payment method updated");
  };

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
          Payment Method
        </Typography>

        <TextField
          label="Cardholder Name"
          name="name"
          value={card.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Card Brand (e.g. Visa)"
          name="brand"
          value={card.brand}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last 4 Digits"
          name="last4"
          value={card.last4}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          sx={{ background: "#00E5FF", color: "#000", fontWeight: 700 }}
          onClick={handleSave}
        >
          Save Payment Method
        </Button>
      </Paper>
    </Container>
  );
}
