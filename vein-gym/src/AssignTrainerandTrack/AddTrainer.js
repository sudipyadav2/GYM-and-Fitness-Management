import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid
} from "@mui/material";
import { db, storage } from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddTrainer() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddTrainer = async () => {
    if (!name) return alert("Trainer name is required");

    setLoading(true);

    let photoURL = "";

    try {
      if (photo) {
        const storageRef = ref(storage, `trainers/${Date.now()}_${photo.name}`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "trainers"), {
        name,
        skills: skills.split(",").map(s => s.trim()),
        experience,
        bio,
        photoURL
      });

      alert("Trainer added successfully!");
      setName("");
      setSkills("");
      setExperience("");
      setBio("");
      setPhoto(null);
    } catch (err) {
      console.error(err);
      alert("Error adding trainer");
    }

    setLoading(false);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Add New Trainer
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Trainer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Experience (years)"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Button>
            {photo && <Typography sx={{ mt: 1 }}>{photo.name}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddTrainer}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Trainer"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
