import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminMembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    features: ""
  });

  const loadPlans = async () => {
    const snap = await getDocs(collection(db, "membershipPlans"));
    setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    await addDoc(collection(db, "membershipPlans"), {
      name: form.name,
      price: Number(form.price),
      features: form.features.split(",").map(f => f.trim())
    });
    setForm({ name: "", price: "", features: "" });
    loadPlans();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "membershipPlans", id));
    loadPlans();
  };

  return (
    <Container sx={{ mt: 10, pb: 6 }}>
      <Typography variant="h4" fontWeight={800} mb={3} color="white">
        Admin: Membership Plans
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Create / Edit Plan
        </Typography>
        <TextField
          label="Plan Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Features (comma separated)"
          name="features"
          value={form.features}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleCreate}>
          Save Plan
        </Button>
      </Paper>

      <Box sx={{ display: "grid", gap: 2 }}>
        {plans.map(plan => (
          <Paper key={plan.id} sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6">{plan.name}</Typography>
              <Typography>£{plan.price}</Typography>
              <Typography variant="body2">
                {plan.features?.join(", ")}
              </Typography>
            </Box>
            <IconButton color="error" onClick={() => handleDelete(plan.id)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
