import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Alert
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { sendEmailVerification } from "firebase/auth";

export default function Emailverification() {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);

  const resend = async () => {
    await sendEmailVerification(user);
    setSent(true);
  };

  return (
    <Container sx={{ mt: 6, maxWidth: "600px !important" }}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: "16px",
        background: "linear-gradient(145deg, rgba(0,229,255,0.08), rgba(0,0,0,0.9))",
        color: "white"
      }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Email Verification</Typography>

        {user.emailVerified ? (
          <Alert severity="success">Your email is verified!</Alert>
        ) : (
          <>
            <Alert severity="warning" sx={{ mb: 2 }}>Email not verified.</Alert>
            {sent && <Alert severity="success" sx={{ mb: 2 }}>Verification email sent!</Alert>}
            <Button variant="contained" fullWidth sx={{ background: "#00e5ff" }} onClick={resend}>
              Resend Verification Email
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
