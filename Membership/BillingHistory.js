import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

export default function BillingHistory() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "billingHistory"),
        where("userId", "==", user.uid)
      );
      const snap = await getDocs(q);
      setBills(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    if (user) load();
  }, [user]);

  return (
    <Container sx={{ mt: 10, maxWidth: "900px !important" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(145deg,#020617,#0B1120)",
          color: "white",
          border: "1px solid rgba(0,229,255,0.25)"
        }}
        elevation={6}
      >
        <Typography variant="h4" fontWeight={800} mb={3}>
          Billing History
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#9CA3AF" }}>Date</TableCell>
              <TableCell sx={{ color: "#9CA3AF" }}>Plan</TableCell>
              <TableCell sx={{ color: "#9CA3AF" }}>Amount</TableCell>
              <TableCell sx={{ color: "#9CA3AF" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map(b => (
              <TableRow key={b.id}>
                <TableCell sx={{ color: "white" }}>{b.date}</TableCell>
                <TableCell sx={{ color: "white" }}>{b.planName}</TableCell>
                <TableCell sx={{ color: "white" }}>£{b.amount}</TableCell>
                <TableCell sx={{ color: "white" }}>{b.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
