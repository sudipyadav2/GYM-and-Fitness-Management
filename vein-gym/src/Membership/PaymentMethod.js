import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = location.state?.plan;

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
    if (!selectedPlan) {
      alert("No plan selected");
      return;
    }

    
    await updateDoc(doc(db, "users", user.uid), {
      paymentMethod: card
    });

  
    await addDoc(collection(db, "billingHistory"), {
      userId: user.uid,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      amount: selectedPlan.price,
      date: new Date().toISOString(),
      cardLast4: card.last4,
      cardBrand: card.brand
    });


    await updateDoc(doc(db, "users", user.uid), {
      "membership.status": "active"
    });

    alert("Payment successful");

   
    navigate("/membership/status");
  };

  const inputStyle = {
    mb: 2,
    input: { color: "#fff" },
    label: { color: "#00E5FF" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "rgba(0,229,255,0.4)" },
      "&:hover fieldset": { borderColor: "#00E5FF" },
      "&.Mui-focused fieldset": { borderColor: "#00E5FF" }
    }
  };

  return (
    <Container sx={{ mt: 10, maxWidth: "700px !important" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(145deg,#020617,#0B1120)",
          color: "white",
          border: "1px solid rgba(48, 100, 106, 0.25)",
          boxShadow: "0 0 20px rgba(0,229,255,0.1)"
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight={800} mb={3} sx={{ color: "#00E5FF" }}>
          Payment Method
        </Typography>

        {selectedPlan && (
          <Typography sx={{ mb: 3, color: "#00E5FF", fontWeight: 600 }}>
            Paying for: {selectedPlan.name} — £{selectedPlan.price}
          </Typography>
        )}

        <TextField
          label="Cardholder Name"
          name="name"
          value={card.name}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Card Brand (e.g. Visa)"
          name="brand"
          value={card.brand}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Last 4 Digits"
          name="last4"
          value={card.last4}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
        />

        <Button
          variant="contained"
          sx={{
            background: "#00E5FF",
            color: "#000",
            fontWeight: 700,
            px: 3,
            py: 1.2,
            borderRadius: "12px",
            mt: 2,
            "&:hover": { background: "#00BBD4" }
          }}
          onClick={handleSave}
        >
          Save Payment Method & Pay
        </Button>
      </Paper>
    </Container>
  );
}
