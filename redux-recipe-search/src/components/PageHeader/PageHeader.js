import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const backgroundImage = "food-background2.jpg";

export default function PageHeader() {
  return (
    <Box
      sx={{
        height: "25vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/${backgroundImage})`,
        backgroundSize: "110% auto",
        backgroundPosition: "center bottom",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Welcome to Recipe Search</Typography>
    </Box>
  );
}
