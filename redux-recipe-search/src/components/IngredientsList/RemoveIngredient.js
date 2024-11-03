import { IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";

import { recipeSearchActions } from "../../redux/actions.js";

export default function RemoveIngredient({ ingredient }) {
  const dispatch = useDispatch();

  const handleRemoveIngredientClick = () => {
    dispatch(recipeSearchActions.removeIngredient(ingredient));
  };

  return (
    <>
      <IconButton
        data-testid="remove-ingredient"
        onClick={() => handleRemoveIngredientClick()}
        sx={{
          borderRadius: "0px 20px 20px 0px",
          height: "1.8rem",
          "&:hover": { backgroundColor: "#F3D8DA" },
        }}
      >
        <Typography variant="caption">remove</Typography>
        <DeleteForeverIcon color="error" />
      </IconButton>
    </>
  );
}
