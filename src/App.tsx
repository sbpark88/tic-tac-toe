import React, { useState } from "react";
import "./styles/App.scss";
import Board from "./components/Board";
import Info from "./components/Info";
import { useGameHistory } from "./hooks/useGameHistory";

function App() {
  const history = useGameHistory();

  return (
    <div className={`game ${history.winner ? "end" : ""}`}>
      <h2>Tic Tac Toe</h2>
      <Board {...history} />
      <Info {...history} />
    </div>
  );
}

export default App;
