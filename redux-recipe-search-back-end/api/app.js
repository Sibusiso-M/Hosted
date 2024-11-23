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
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});
// Load environment variables
// Configure CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (isProduction) {
      const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};

if (!isProduction) {
  app.use(morgan("dev")); // Log requests in development
}
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

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

if (!isProduction) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
} else {
  //show nothing in production environment.
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
  
  server.timeout = 10000; // Increase to 10 seconds
}