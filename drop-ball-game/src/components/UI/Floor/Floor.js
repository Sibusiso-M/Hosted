import Hole from "./Hole";
import { useEffect, useState } from "react";

export default function Floor({ floorProps }) {
  const [hideFloor, setFloorHide] = useState(false);

  useEffect(() => {
    if (floorProps.top >= 600) {
      setFloorHide(true);
    } else {
      setFloorHide(false);
    }
  }, [floorProps]);

  return (
    <>
      <div
        id="floor"
        style={{
          width: 700,
          height: 20,
          backgroundColor: "black",
          top: floorProps.top,
          position: "absolute",
          zIndex: -1,
        }}
        hidden={hideFloor}
      >
        <Hole gapPosition={floorProps.hole} />
      </div>
    </>
  );
}
