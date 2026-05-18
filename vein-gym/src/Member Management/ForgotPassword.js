import { useState } from "react";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent! Check your inbox.");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <Container sx={{ mt: 10, maxWidth: "600px !important" }}>
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
          Reset Password
        </Typography>

        <TextField
          label="Enter your email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            input: { color: "#fff" },
            label: { color: "#00E5FF" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(0,229,255,0.4)" },
              "&:hover fieldset": { borderColor: "#00E5FF" },
              "&.Mui-focused fieldset": { borderColor: "#00E5FF" }
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "#00E5FF",
            color: "#000",
            fontWeight: 700,
            py: 1.2,
            borderRadius: "12px",
            "&:hover": { background: "#00BBD4" }
          }}
          onClick={handleReset}
        >
          Send Reset Email
        </Button>

        {msg && (
          <Typography sx={{ mt: 2, color: "#00E5FF", textAlign: "center" }}>
            {msg}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
