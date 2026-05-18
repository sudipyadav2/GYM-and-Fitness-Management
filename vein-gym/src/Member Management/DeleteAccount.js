import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Alert,
  Box
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { auth, db } from "../Firebase";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

export default function DeleteAccount() {
  const { user } = useAuth();
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "members", user.uid));
    await deleteUser(auth.currentUser);
    setDone(true);
  };

  if (done) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="success">Account deleted successfully.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6, maxWidth: "600px !important" }}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: "16px",
        background: "linear-gradient(145deg, rgba(255,0,0,0.1), rgba(0,0,0,0.9))",
        color: "white"
      }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Delete Account</Typography>

        {!confirm ? (
          <Button variant="contained" fullWidth sx={{ background: "red" }} onClick={() => setConfirm(true)}>
            Delete My Account
          </Button>
        ) : (
          <Box>
            <Alert severity="warning" sx={{ mb: 2 }}>This action is permanent.</Alert>
            <Button variant="contained" fullWidth sx={{ background: "red" }} onClick={handleDelete}>
              Confirm Delete
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
