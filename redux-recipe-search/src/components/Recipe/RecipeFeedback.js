import { useSelector } from "react-redux";
import GenericFeedback from "../FeedbackForUser/GenericFeedback";

const RecipeFeedback = () => {
  const apiKeyExists = useSelector((state) => state.apiKeyExists);
  const appIdExists = useSelector((state) => state.appIdExists);
  const recipeResponseEmpty = useSelector((state) => state.recipeResponseEmpty);
  const fetchResponseErrorMessage = useSelector(
    (state) => state.fetchResponseErrorMessage
  );

  const recipeFeedbackConditions = [
    {
      condition: apiKeyExists !== true,
      text: "Api key is missing.",
      dataTestID: "apiKey-empty-error",
      type: "error",
    },
    {
      condition: appIdExists !== true,
      text: "App ID is missing.",
      dataTestID: "appId-empty-error",
      type: "error",
    },
    {
      condition: recipeResponseEmpty === true,
      text: "No recipes were found.",
      dataTestID: "recipe-empty-message-text",
      type: "info",
    },
    {
      condition: fetchResponseErrorMessage !== null,
      text: fetchResponseErrorMessage,
      dataTestID: "fetch-response-error-message",
      type: "error",
    },
  ];

  return <GenericFeedback feedbackConditions={recipeFeedbackConditions} />;
};

export default RecipeFeedback;
