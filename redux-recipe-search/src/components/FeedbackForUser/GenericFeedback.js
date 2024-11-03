import React from "react";
import { Alert } from "@mui/material";

export default function GenericFeedback({ feedbackConditions }) {
  const alertSeverity = {
    info: "info",
    error: "error",
  };

  function FeedbackStyle({ text, dataTestID, type }) {
    return (
      <div
        style={{
          fontFamily: "Poppins",
          fontSize: "0.8rem",
          fontWeight: 300,
          lineHeight: 1,
          color: "#dc3545",
        }}
        data-testid={dataTestID}
      >
        {alertSeverity[type] ? (
          <Alert severity={alertSeverity[type]}>{text}</Alert>
        ) : (
          text
        )}
      </div>
    );
  }

  return feedbackConditions.map(
    (conditionItem, index) =>
      conditionItem.condition && (
        <FeedbackStyle
          key={index}
          text={conditionItem.text}
          dataTestID={conditionItem.dataTestID}
          type={conditionItem.type}
        />
      )
  );
}
