import React, { useEffect, useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Fab, Typography } from "@mui/material";

export default function ScrollToTopButton() {
  const [scrollToTopEnabled, setScrollToTopEnabled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setScrollToTopEnabled(true);
      } else {
        setScrollToTopEnabled(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {scrollToTopEnabled && (
        <Fab
          variant="extended"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: "10px",
            right: "1rem",
            alignContent: "center",
            opacity: 0.6,
            "&:hover": { opacity: 1 },
          }}
        >
          <NavigationIcon sx={{ mr: 0 }} />
          <Typography>Top</Typography>
        </Fab>
      )}
    </>
  );
}
