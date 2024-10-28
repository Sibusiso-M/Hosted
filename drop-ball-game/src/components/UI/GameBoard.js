import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Player from "./Player";
import Floor from "./Floor/Floor";
import {
  addFloor,
  setStartGameButtonHidden,
  setGameOver,
  clearFloors,
} from "../../redux/slices/gameBoardSlice";
import { setHiddenPlayer } from "../../redux/slices/playerSlice";
import { actions } from "../../redux/actions/actions";
import { clearScore } from "../../redux/slices/gameStatusSlice";
import { buttonStyles } from "../../styles";

const GameBoard = () => {
  const dispatch = useDispatch();
  const height = useSelector((state) => state.gameBoard.height);
  const width = useSelector((state) => state.gameBoard.width);
  const boarder = useSelector((state) => state.gameBoard.boarder);
  const backgroundColor = useSelector(
    (state) => state.gameBoard.backgroundColor
  );
  const floors = useSelector((state) => state.gameBoard.floors);
  const startGameButtonHidden = useSelector(
    (state) => state.gameBoard.startGameButtonHidden
  );
  const gameOver = useSelector((state) => state.gameBoard.gameOver);

  const startGame = useCallback(() => {
    dispatch(actions.startGame);
    dispatch(setStartGameButtonHidden(true));
    dispatch(setHiddenPlayer(false));
    dispatch(addFloor());
  }, [dispatch]);

  const handleStartGameClick = () => {
    startGame();
  };

  const handleResetGameClick = () => {
    if (gameOver) {
      dispatch(setGameOver(false));
      dispatch(clearFloors());
      dispatch(clearScore());
    }
    startGame();
  };

  return (
    <>
      <div
        data-testid="gameboard"
        style={{
          backgroundColor: backgroundColor,
          width: width,
          height: height,
          border: boarder,
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {gameOver ? (
          <div
            style={{
              backgroundColor: "#efefef",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <h4
              style={{
                color: "purple",
                backgroundColor: "white",
                textAlign: "center",
              }}
            >
              Game Over
            </h4>
            <div width="100%">
              <button
                id="Reset-game-button"
                onClick={handleResetGameClick}
                style={buttonStyles}
              >
                Reset Game
              </button>
            </div>
          </div>
        ) : (
          <>
            {!gameOver && startGameButtonHidden && <Player />}
            {floors.map((floorProps, index) => (
              <Floor key={index} floorProps={floorProps} />
            ))}

            {!startGameButtonHidden && (
              <div
                style={{
                  backgroundColor: "#efefef",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <button
                  id="start-game-button"
                  onClick={handleStartGameClick}
                  style={buttonStyles}
                >
                  Start Game
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GameBoard;
