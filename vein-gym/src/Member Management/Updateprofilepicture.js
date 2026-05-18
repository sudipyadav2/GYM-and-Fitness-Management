import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Avatar,
  Alert
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { db, storage } from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export default function UpdateProfilePicture() {
  const { user } = useAuth();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    setSaving(true);
    setSuccess(false);

    try {
      // Upload to Firebase Storage
      const fileRef = ref(storage, `profilePictures/${user.uid}.jpg`);
      await uploadBytes(fileRef, file);

      // Get URL
      const url = await getDownloadURL(fileRef);

      // Update Firebase Auth profile
      await updateProfile(user, { photoURL: url });

      // Update Firestore
      await updateDoc(doc(db, "members", user.uid), {
        photoURL: url,
        updatedAt: new Date()
      });

      setSuccess(true);
    } catch (err) {
      console.error("Upload error:", err);
    }

    setSaving(false);
  };

  return (
    <Container sx={{ mt: 6, maxWidth: "600px !important" }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "16px",
          background:
            "linear-gradient(145deg, rgba(0,229,255,0.08), rgba(0,0,0,0.9))",
          color: "white"
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Update Profile Picture
        </Typography>

        <Typography variant="body2" mb={3}>
          Upload a new profile picture to personalize your account.
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile picture updated successfully!
          </Alert>
        )}

        {/* PREVIEW */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={preview || user.photoURL || ""}
            sx={{
              width: 140,
              height: 140,
              margin: "auto",
              border: "3px solid #00e5ff"
            }}
          />
        </Box>

        {/* SELECT FILE */}
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{
            background: "#0077ff",
            fontWeight: "bold",
            "&:hover": { background: "#005fcc" }
          }}
        >
          Choose Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>

        {/* UPLOAD BUTTON */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            background: "#00e5ff",
            fontWeight: "bold",
            "&:hover": { background: "#00bcd4" }
          }}
          disabled={!file || saving}
          onClick={handleUpload}
        >
          {saving ? "Uploading..." : "Save Picture"}
        </Button>
      </Paper>
    </Container>
  );
}
