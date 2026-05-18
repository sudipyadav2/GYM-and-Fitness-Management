import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Box,
  Divider
} from "@mui/material";
import { useAuth } from "../AuthContext";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Viewprofile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) setProfile(snap.data());
    };

    loadProfile();
  }, [user.uid]);

  if (!profile) return <Container sx={{ mt: 6 }}><Typography>Loading...</Typography></Container>;

  return (
    <Container sx={{ mt: 6, maxWidth: "600px !important" }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "16px",
          background: "linear-gradient(145deg, rgba(0,229,255,0.08), rgba(0,0,0,0.9))",
          color: "white"
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            src={profile.photoURL || ""}
            sx={{
              width: 120,
              height: 120,
              margin: "auto",
              border: "3px solid #00e5ff"
            }}
          />
          <Typography variant="h5" fontWeight="bold" mt={2}>{profile.name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>{profile.email}</Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", mb: 3 }} />

        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>Phone</Typography>
        <Typography mb={2}>{profile.phone || "Not provided"}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>Address</Typography>
        <Typography>{profile.address || "Not provided"}</Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button component={Link} to="/member/edit-profile" variant="contained" sx={{ background: "#00e5ff" }}>
            Edit Profile
          </Button>

          <Button component={Link} to="/member/update-picture" variant="contained" sx={{ background: "#0077ff" }}>
            Update Picture
          </Button>

          <Button component={Link} to="/member/delete-account" variant="contained" sx={{ background: "red" }}>
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
