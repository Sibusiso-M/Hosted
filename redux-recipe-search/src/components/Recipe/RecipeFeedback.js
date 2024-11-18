import { useSelector } from "react-redux";
import GenericFeedback from "../FeedbackForUser/GenericFeedback";

const RecipeFeedback = () => {
  const recipeResponseEmpty = useSelector((state) => state.recipeResponseEmpty);
  const fetchResponseErrorMessage = useSelector(
    (state) => state.fetchResponseErrorMessage
  );

  const recipeFeedbackConditions = [
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
