import { v4 as uuidv4 } from "uuid";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import RemoveIngredient from "./RemoveIngredient.js";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: "20px",
  border: "1px solid #ccc",
  height: "1.8rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function IngredientItems({ ingredients }) {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {ingredients.map((ingredient) => {
        return (
          <ListItem key={uuidv4()}>
            <Chip label={ingredient} />
            <RemoveIngredient ingredient={ingredient} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
