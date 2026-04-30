import { Button, Container, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export default function Dashboard() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4">Member Dashboard</Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => signOut(auth)}>
        Logout
      </Button>
    </Container>
  );
}
