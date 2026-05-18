import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";
import { db } from "../Firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";

export default function TrackTrainerHours() {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [rows, setRows] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const load = async () => {
      const tSnap = await getDocs(collection(db, "trainers"));
      setTrainers(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  useEffect(() => {
    const loadHours = async () => {
      if (!selectedTrainer) return;


      const snap = await getDocs(
        collection(db, "trainerHours", selectedTrainer, "entries")
      );
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRows(data);
      setTotalHours(
        data.reduce((sum, r) => sum + (r.hours || 0), 0)
      );
    };
    loadHours();
  }, [selectedTrainer]);

  const exportReport = () => {
    const csv = [
      "Date,Class,Hours",
      ...rows.map(r => `${r.date},${r.className},${r.hours}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "trainer-hours.csv";
    a.click();
  };

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Track Trainer Hours
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
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

          <Button variant="outlined" onClick={exportReport} disabled={!rows.length}>
            Export CSV
          </Button>
        </Box>

        <Typography variant="subtitle1" mb={1}>
          Total Hours: {totalHours}
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.className}</TableCell>
                <TableCell>{r.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
