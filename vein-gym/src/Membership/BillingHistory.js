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

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <Container sx={{ mt: 10, maxWidth: "900px !important" }}>
      <Paper
        sx={{
          p: 4,
          borderRadius: "20px",
          background: "linear-gradient(145deg,#020617,#0B1120)",
          color: "white",
          border: "1px solid rgba(0,229,255,0.25)",
          boxShadow: "0 0 20px rgba(0,229,255,0.1)"
        }}
        elevation={6}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          mb={3}
          sx={{ color: "#00E5FF" }}
        >
          Billing History
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#00E5FF", fontWeight: 700 }}>Date</TableCell>
              <TableCell sx={{ color: "#00E5FF", fontWeight: 700 }}>Plan</TableCell>
              <TableCell sx={{ color: "#00E5FF", fontWeight: 700 }}>Amount</TableCell>
              <TableCell sx={{ color: "#00E5FF", fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bills.map(b => (
              <TableRow
                key={b.id}
                sx={{
                  "&:hover": {
                    background: "rgba(0,229,255,0.08)"
                  }
                }}
              >
                <TableCell sx={{ color: "white" }}>
                  {formatDate(b.date)}
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  {b.planName}
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                  £{b.amount}
                </TableCell>

                <TableCell sx={{ color: "#00E5FF", fontWeight: 700 }}>
                  {b.status || "Paid"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
