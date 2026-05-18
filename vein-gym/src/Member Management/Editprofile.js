import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from "@mui/material";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Editprofile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "members", user.uid));
      if (snap.exists()) setForm(snap.data());
    };
    load();
  }, [user.uid]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    await updateDoc(doc(db, "members", user.uid), {
      name: form.name,
      phone: form.phone,
      address: form.address,
      updatedAt: new Date()
    });
    setSaved(true);
  };

  return (
    <Container sx={{ mt: 6, maxWidth: "600px !important" }}>
      <Paper elevation={6} sx={{
        p: 4,
        borderRadius: "16px",
        background: "linear-gradient(145deg, rgba(0,229,255,0.08), rgba(0,0,0,0.9))",
        color: "white"
      }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Edit Profile</Typography>

        {saved && <Alert severity="success" sx={{ mb: 2 }}>Profile updated!</Alert>}

        <TextField label="Name" name="name" fullWidth margin="normal"
          value={form.name} onChange={handleChange}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField label="Phone" name="phone" fullWidth margin="normal"
          value={form.phone} onChange={handleChange}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <TextField label="Address" name="address" fullWidth margin="normal" multiline rows={3}
          value={form.address} onChange={handleChange}
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "white" } }}
        />

        <Button variant="contained" fullWidth sx={{ mt: 3, background: "#00e5ff" }} onClick={save}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
}
