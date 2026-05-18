import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button
} from "@mui/material";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

export default function AssignTrainer() {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [classId, setClassId] = useState("");
  const [trainerId, setTrainerId] = useState("");

  useEffect(() => {
    const load = async () => {
      const cSnap = await getDocs(collection(db, "classes"));
      setClasses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const tSnap = await getDocs(collection(db, "trainers"));
      setTrainers(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  const assign = async () => {
    if (!classId || !trainerId) return;
    const trainer = trainers.find(t => t.id === trainerId);
    await updateDoc(doc(db, "classes", classId), {
      trainerId,
      trainerName: trainer?.name || ""
    });
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Assign Trainer to Class
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            select
            label="Class"
            value={classId}
            onChange={e => setClassId(e.target.value)}
            sx={{ minWidth: 260 }}
          >
            {classes.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

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

          <Button variant="contained" onClick={assign}>
            Assign
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
