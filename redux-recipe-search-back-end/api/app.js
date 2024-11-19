const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
const morgan = require("morgan");

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });
const app = express();

const isProduction = process.env.NODE_ENV === "production";
console.log("CORS_ALLOWED_ORIGINS:", process.env);
console.log("CORS_ALLOWED_ORIGINS:", process.env.CORS_ALLOWED_ORIGINS);

const corsOptions = {
  origin: isProduction
    ? process.env.CORS_ALLOWED_ORIGINS.split(",") // Restrict in production
    : "*", // Allow all origins in development
  credentials: true, // Allow cookies/auth headers
};

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
//#Why POST method
//The client sends a JSON payload with the search parameters, and your server handles the logic transparently.
//Future additions (e.g., pagination, user preferences) can be handled within the request body without overloading the URL structure.

app.use(cors(corsOptions));

app.options("*", cors(corsOptions)); // Handles preflight for all routes

app.post("/recipes", async (req, res) => {
  const { searchKeyword, ingredients } = req.body;
  const envFile =
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development";
  dotenv.config({ path: envFile });
  const { EDAMAM_APP_ID: appId, EDAMAM_APP_KEY: appKey } = process.env;

  if (!appKey || !appId) {
    res.status(500).json({ error: "API credentials are missing" });
  } else if (
    !searchKeyword ||
    typeof searchKeyword !== "string" ||
    searchKeyword.length < 3
  ) {
    res.status(400).json({
      error: "Search keyword must be a valid string with 3+ characters",
    });
  } else if (!ingredients) {
    res.status(400).json({
      error:
        "Ingredients should be defined (use a comma-separated list if multiple)",
    });
  } else {
    const recipeApiUrl = "https://api.edamam.com/api/recipes/v2";
    const urlParameters = `${recipeApiUrl}?q=${searchKeyword} ${ingredients.join(
      " "
    )}&app_id=${appId}&app_key=${appKey}&type=public`;

    try {
      const response = await axios.get(urlParameters);
      const recipes = response.data.hits.map(({ recipe }) => {
        const { image, ingredientLines, label } = recipe;
        return { image, ingredientLines, label };
      });
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({
        error: error.response?.data || "Failed to fetch recipes",
      });
    }
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
