import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import GameBoard from "./components/UI/GameBoard";
import StatusBar from "./components/UI/StatusBar";

export default function App() {
  return (
    <Provider store={store}>
      <div className="App" >
        <div
          style={{
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#efefef",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h3 style={{ color: "purple" }}>Ball Drop</h3>
        </div>

        <div
          style={{
            height: "30px",
            backgroundColor: "white",
            zIndex: 20,
            marginBottom: 1,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatusBar />
          <GameBoard />
        </div>
        <div
          style={{
            height: "30px",
            backgroundColor: "white",
            zIndex: 20,
          }}
        />
      </div>
    </Provider>
  );
}
