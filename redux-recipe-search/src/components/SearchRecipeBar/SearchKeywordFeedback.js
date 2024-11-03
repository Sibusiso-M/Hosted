import { useSelector } from "react-redux";
import GenericFeedback from "../FeedbackForUser/GenericFeedback";

const SearchKeywordFeedback = () => {
  const searchKeywordEmpty = useSelector((state) => state.searchKeywordEmpty);
  const alphabeticalKeywordError = useSelector(
    (state) => state.alphabeticalKeywordError
  );

  const searchKeywordFeedbackConditions = [
    {
      condition: searchKeywordEmpty === true,
      text: "Please Enter A Keyword",
      dataTestID: "search-keyword-input-empty-error-text",
      type: "textbox",
    },
    {
      condition: alphabeticalKeywordError === true,
      text: "Keyword should only contain alphabets",
      dataTestID: "search-keyword-alphabetical-error-text",
      type: "textbox",
    },
  ];

  return (
    <GenericFeedback feedbackConditions={searchKeywordFeedbackConditions} />
  );
};

export default SearchKeywordFeedback;
