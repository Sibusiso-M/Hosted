const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

if (!process.env.VERCEL) {
  require("dotenv").config({
    path:
      process.env.NODE_ENV === "production"
        ? ".env.production"
        : ".env.development",
  });
}

const app = express();
app.set("trust proxy", 1);

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const apiRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(apiRequestLimiter);

const allowedCorsOrigins =
  process.env.CORS_ALLOWED_ORIGINS
    ?.split(",")
    .map(origin => origin.trim()) ?? [];


app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (server-to-server or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS origin rejected"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/recipes", async (req, res) => {
  try {
    const { searchKeyword, ingredients } = req.body;
    const edamamApplicationId = process.env.EDAMAM_APP_ID;
    const edamamApplicationKey = process.env.EDAMAM_APP_KEY;

    if (!edamamApplicationKey || !edamamApplicationId) {
      res.status(500).json({ error: "Edamam credentials are not configured" });
    } else if (!searchKeyword || typeof searchKeyword !== "string" || searchKeyword.length < 3) {
      res.status(400).json({
        error: "Search keyword must be a valid string with 3+ characters",
      });
    } else if (!Array.isArray(ingredients) || ingredients.length === 0) {
      res.status(400).json({
        error:
              "Ingredients must be a non-empty array of strings"
      });
    } else {
      const recipeApiUrl = "https://api.edamam.com/api/recipes/v2";
      const query = encodeURIComponent(
        `${searchKeyword.trim()} ${ingredients.join(" ")}`
      );

      const requestUrl =
        `${recipeApiUrl}?q=${query}` +
        `&app_id=${edamamApplicationId}` +
        `&app_key=${edamamApplicationKey}` +
        `&type=public`;

      const edamamResponse = await axios.get(requestUrl);

      const recipes = edamamResponse.data.hits.map(({ recipe }) => {
        const { image, ingredientLines, label } = recipe;
        return { image, ingredientLines, label };
      });
      res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch recipes",
    });
  }
});

module.exports = app;