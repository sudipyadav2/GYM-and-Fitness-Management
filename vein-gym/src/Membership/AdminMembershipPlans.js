import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Switch,
  FormControlLabel
} from "@mui/material";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminMembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    features: "",
    popular: false
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

  const handleTogglePopular = () =>
    setForm({ ...form, popular: !form.popular });

  const resetForm = () => {
    setForm({ name: "", price: "", features: "", popular: false });
    setEditingId(null);
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) return alert("Name & Price required");

    await addDoc(collection(db, "membershipPlans"), {
      name: form.name,
      price: Number(form.price),
      features: form.features.split(",").map(f => f.trim()),
      popular: form.popular
    });

    resetForm();
    loadPlans();
  };

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setForm({
      name: plan.name,
      price: plan.price,
      features: plan.features.join(", "),
      popular: plan.popular || false
    });
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "membershipPlans", editingId), {
      name: form.name,
      price: Number(form.price),
      features: form.features.split(",").map(f => f.trim()),
      popular: form.popular
    });

    resetForm();
    loadPlans();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "membershipPlans", id));
    loadPlans();
  };

  return (
    <Container sx={{ mt: 10, pb: 6 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        mb={3}
        sx={{ color: "#00E5FF", textAlign: "center" }}
      >
        Admin: Membership Plans
      </Typography>

      {/* FORM CARD */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,229,255,0.25)"
        }}
      >
        <Typography variant="h6" mb={2} sx={{ color: "white" }}>
          {editingId ? "Edit Plan" : "Create New Plan"}
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
          label="Price (£)"
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

        <FormControlLabel
          control={
            <Switch
              checked={form.popular}
              onChange={handleTogglePopular}
              sx={{ color: "#00E5FF" }}
            />
          }
          label="Mark as Popular"
          sx={{ color: "white", mb: 2 }}
        />

        {editingId ? (
          <Button
            variant="contained"
            onClick={handleUpdate}
            sx={{
              background: "#00E5FF",
              color: "#000",
              fontWeight: 700,
              mr: 2
            }}
          >
            Update Plan
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              background: "#00E5FF",
              color: "#000",
              fontWeight: 700,
              mr: 2
            }}
          >
            Save Plan
          </Button>
        )}

        {editingId && (
          <Button
            variant="outlined"
            onClick={resetForm}
            sx={{ borderColor: "#00E5FF", color: "#00E5FF" }}
          >
            Cancel Edit
          </Button>
        )}
      </Paper>

      {/* LIST OF PLANS */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
        }}
      >
        {plans.map(plan => (
          <Paper
            key={plan.id}
            sx={{
              p: 3,
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,229,255,0.25)",
              color: "white",
              position: "relative"
            }}
          >
            {plan.popular && (
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: -40,
                  background: "#00E5FF",
                  color: "#000",
                  px: 6,
                  py: 0.5,
                  transform: "rotate(35deg)",
                  fontSize: 12,
                  fontWeight: 800
                }}
              >
                POPULAR
              </Box>
            )}

            <Typography variant="h5" fontWeight={700} sx={{color:"#00E5FF"}}>
              {plan.name}
            </Typography>

            <Typography variant="h4" sx={{ color: "#00E5FF", mt: 1 }}>
              £{plan.price}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              {plan.features?.join(", ")}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                variant="outlined"
                sx={{ borderColor: "#00E5FF", color: "#00E5FF" }}
                onClick={() => handleEdit(plan)}
              >
                Edit
              </Button>

              <IconButton color="error" onClick={() => handleDelete(plan.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
