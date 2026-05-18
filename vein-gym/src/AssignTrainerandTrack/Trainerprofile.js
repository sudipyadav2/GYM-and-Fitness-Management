import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Avatar
} from "@mui/material";
import { db } from "../Firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export default function TrainerProfilePage() {
  const { id } = useParams(); 
  const [trainer, setTrainer] = useState(null);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const load = async () => {
      const tSnap = await getDoc(doc(db, "trainers", id));
      if (tSnap.exists()) setTrainer(tSnap.data());

      const cQ = query(
        collection(db, "classes"),
        where("trainerId", "==", id)
      );
      const cSnap = await getDocs(cQ);
      setClasses(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, [id]);

  if (!trainer) return <Container sx={{ mt: 6 }}><Typography>Loading...</Typography></Container>;

  return (
    <Container sx={{ mt: 6, mb: 6, maxWidth: "900px !important" }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg,#0f172a,#020617)",
          color: "white"
        }}
      >
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Avatar
            src={trainer.photoURL || ""}
            sx={{ width: 90, height: 90, border: "3px solid #22d3ee" }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {trainer.name}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {trainer.title || "Personal Trainer"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Bio</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {trainer.bio || "No bio provided."}
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Skills</Typography>
          <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {(trainer.skills || []).map((s, i) => (
              <Chip key={i} label={s} color="primary" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Certifications</Typography>
          <Box sx={{ mt: 1 }}>
            {(trainer.certifications || []).map((c, i) => (
              <Typography key={i} variant="body2">• {c}</Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" mb={1}>
            Available Classes
          </Typography>
          {classes.length === 0 ? (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              No classes assigned yet.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {classes.map(cls => (
                <Grid item xs={12} md={6} key={cls.id}>
                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: "#020617",
                      border: "1px solid #1e293b"
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {cls.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {cls.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/class/register/${cls.id}`}
                      size="small"
                      sx={{ mt: 1 }}
                    >
                      View / Register
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
