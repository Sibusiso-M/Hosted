import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveLeft, moveRight } from "../../redux/slices/playerSlice";

export default function Player() {
  const dispatch = useDispatch();

  const playerLeft = useSelector((state) => state.player.left);
  const playerTop = useSelector((state) => state.player.top);
  const hidePlayer = useSelector((state) => state.player.hidePlayer);

  const handleKeyDown = useCallback(
    (event) => {
      let { key } = event;
      key = key.toLowerCase();
      switch (key) {
        case "arrowleft":
        case "a":
          dispatch(moveLeft());
          break;
        case "arrowright":
        case "d":
          dispatch(moveRight());
          break;

        default:
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {!hidePlayer && (
        <div
          id="player-player"
          data-testid="player-player"
          style={{
            width: 30,
            height: 30,
            backgroundColor: "purple",
            borderRadius: "50%",
            position: "absolute",
            top: `${playerTop}px`,
            left: `${playerLeft}px`,
            zIndex: 2,
          }}
        />
      )}
    </>
  );
}
