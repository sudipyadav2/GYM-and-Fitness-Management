import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      id="footer"
      sx={{
        py: 4,
        textAlign: "center",
        background: "#111",
        borderTop: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <Typography sx={{ color: "#B3B3B3" }}>
        © {new Date().getFullYear()} Premium Gym. All rights reserved.
      </Typography>
    </Box>
  );
}
