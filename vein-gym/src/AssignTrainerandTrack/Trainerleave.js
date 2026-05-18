
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";

export default function TrainerLeaveManagement() {
  const [trainers, setTrainers] = useState([]);
  const [trainerId, setTrainerId] = useState("");
  const [date, setDate] = useState("");
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "trainers"));
      setTrainers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  useEffect(() => {
    const loadLeaves = async () => {
      if (!trainerId) return;
      const snap = await getDocs(
        collection(db, "trainerLeaves", trainerId, "days")
      );
      setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    loadLeaves();
  }, [trainerId]);

  const addLeave = async () => {
    if (!trainerId || !date) return;
    await setDoc(
      doc(collection(db, "trainerLeaves", trainerId, "days")),
      { date }
    );
    const snap = await getDocs(
      collection(db, "trainerLeaves", trainerId, "days")
    );
    setLeaves(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Trainer Leave Management
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            select
            label="Trainer"
            value={trainerId}
            onChange={e => setTrainerId(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            {trainers.map(t => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Leave Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" onClick={addLeave}>
            Add Leave
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Leave Days</Typography>
          <List>
            {leaves.map(l => (
              <ListItem key={l.id}>
                <ListItemText primary={l.date} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
}
