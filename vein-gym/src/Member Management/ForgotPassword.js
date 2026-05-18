import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const reset = async () => {
    await sendPasswordResetEmail(auth, email);
    setSent(true);
  };

  return (
    <Container sx={{ mt: 6, maxWidth: "500px !important" }}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: "16px",
        background: "linear-gradient(145deg, rgba(0,229,255,0.08), rgba(0,0,0,0.9))",
        color: "white"
      }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Forgot Password</Typography>

        {sent && <Alert severity="success" sx={{ mb: 2 }}>Reset email sent!</Alert>}

        <TextField label="Email" fullWidth value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <Button variant="contained" fullWidth sx={{ mt: 3, background: "#00e5ff" }} onClick={reset}>
          Send Reset Link
        </Button>
      </Paper>
    </Container>
  );
}
