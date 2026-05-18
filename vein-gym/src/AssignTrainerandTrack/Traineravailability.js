
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
  setDoc,
  query,
  where
} from "firebase/firestore";

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export default function TrainerAvailabilityCalendar() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [day, setDay] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "trainers"));
      setTrainers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  useEffect(() => {
    const loadAvail = async () => {
      if (!selectedTrainer) return;
      const qAvail = query(
        collection(db, "trainerAvailability"),
        where("trainerId", "==", selectedTrainer)
      );
      const snap = await getDocs(qAvail);
      setAvailability(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    loadAvail();
  }, [selectedTrainer]);

  const saveAvailability = async () => {
    if (!selectedTrainer || !day || !timeFrom || !timeTo) return;

    await setDoc(doc(collection(db, "trainerAvailability")), {
      trainerId: selectedTrainer,
      day,
      timeFrom,
      timeTo
    });

    const qAvail = query(
      collection(db, "trainerAvailability"),
      where("trainerId", "==", selectedTrainer)
    );
    const snap = await getDocs(qAvail);
    setAvailability(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Trainer Availability Calendar
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            select
            label="Trainer"
            value={selectedTrainer}
            onChange={e => setSelectedTrainer(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            {trainers.map(t => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Day"
            value={day}
            onChange={e => setDay(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            {DAYS.map(d => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="From"
            type="time"
            value={timeFrom}
            onChange={e => setTimeFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="To"
            type="time"
            value={timeTo}
            onChange={e => setTimeTo(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" onClick={saveAvailability}>
            Save
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Current Availability</Typography>
          <List>
            {availability.map(a => (
              <ListItem key={a.id}>
                <ListItemText
                  primary={`${a.day}: ${a.timeFrom} - ${a.timeTo}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
}
