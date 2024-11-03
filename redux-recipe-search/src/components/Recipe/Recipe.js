import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

import bookLoadingGif from "../../assets/book-page-loader.gif";
import RecipeFeedback from "./RecipeFeedback";

export default function Recipe() {
  const recipes = useSelector((state) => state.recipes);
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <>
      <Typography variant="h4">Results</Typography>
      <Box
        data-testid="results-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {Array.isArray(recipes) &&
          !isLoading &&
          recipes.map(({ image, ingredientLines, label }, index) => (
            <Card
              key={uuidv4()}
              data-testid="recipe-card"
              style={{
                backgroundColor: index % 2 === 0 ? "#F1F1F1" : "transparent",
                maxWidth: "300px",
                flex: "1 0 300px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={label}
              />
              <CardContent>
                <Typography variant="h6" component="h6" fontWeight={700}>
                  {label}
                </Typography>
                <ul
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  <Typography fontWeight={550} marginBottom="10px">
                    {"Ingredients"}
                  </Typography>
                  {ingredientLines &&
                    ingredientLines.map((ingredient, index) => (
                      <li
                        key={uuidv4()}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "lightGray" : "transparent",
                        }}
                      >
                        {ingredient}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        {isLoading && (
          <>
            <Box width="100vw">
              <img
                src={bookLoadingGif}
                alt="Book
									Page
									Loader"
              />
              <Typography>Loading...</Typography>
            </Box>
          </>
        )}
        <RecipeFeedback />
      </Box>
    </>
  );
}
