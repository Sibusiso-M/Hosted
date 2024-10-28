import React from "react";
import { useSelector } from "react-redux";
import { buttonStyles } from "../../styles";

const StatusBar = () => {
  const highlightStyle = {
    fontWeight: "bold",
    color: "#1976D2",
  };
  const score = useSelector((state) => state.gameStatus.score);

  return (
    <div
      data-testid="status-bar"
      style={{
        backgroundColor: "#F0F8FF",
        width: "350px",
        border: "2px solid black",
        marginRight: "15px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <div>Score: {score}</div>
      <div
        style={{
          textAlign: "center",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <h4>How to Play</h4>
        <p>
          Click the
          <button style={buttonStyles}>Start Game</button>
          button to begin the game. Or
          <button style={buttonStyles}>Reset Game</button>
          button to reset the game.
        </p>
        <p>
          Move the ball left with <span style={highlightStyle}>"A"</span> or the{" "}
          <span style={highlightStyle}>left arrow</span> key.
        </p>
        <p>
          Move the ball right with <span style={highlightStyle}>"D"</span> or
          the <span style={highlightStyle}>right arrow</span> key.
        </p>
        <p>
          Your goal is to guide the ball through the holes in the black floor to
          score points.
        </p>

        <h4>Instructions</h4>
        <p>
          Avoid letting the ball get squashed at the top; score points by
          navigating it through the holes in the floor.
        </p>
      </div>
    </div>
  );
};

export default StatusBar;
