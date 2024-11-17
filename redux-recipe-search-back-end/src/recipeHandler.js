const axios = require("axios");

exports.handler = async (event) => {
  const { searchKeyword, ingredients } = JSON.parse(event.body);
  const [appId, appKey] = [
    process.env.EDAMAM_APP_ID,
    process.env.EDAMAM_APP_KEY,
  ];

  if (!appKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API Key should be defined" }),
    };
  } else if (!appId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API URL should be defined" }),
    };
  } else if (!searchKeyword || searchKeyword instanceof String) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Search keyword must be given and valid (3 characters or longer)",
      }),
    };
  } else if (!ingredients) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Ingredients should be defined (even if empty array, that's acceptable)",
      }),
    };
  } else {
    //should all required api data be valid

    const recipeApiUrl = "https://api.edamam.com/api/recipes/v2";

    const url = `${recipeApiUrl}?q=${searchKeyword}
    &app_id=${appId}
    &app_key=${appKey}
    &type=public`;

    try {
      const response = await axios.get(url);
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch recipes" }),
      };
    }
  }
};
