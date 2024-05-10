import React, { FunctionComponent } from "react";
import Square from "./Square";

interface Props {
  turn: number;
  backToTurn: (turnNumber: number) => void;
  winner: string | null;
  currentPlayer: string;
  currentHistory: string[];
  turnCheckHandler: (squareIndex: number) => void;
}

const Board: FunctionComponent<Props> = ({
  currentPlayer,
  currentHistory,
  winner,
  turnCheckHandler,
}) => {
  return (
    <>
      <p className="status">
        {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
      </p>
      <section className="game-board">
        {currentHistory.map((value, index) => (
          <Square
            key={index}
            value={value}
            handler={() => turnCheckHandler(index)}
          />
        ))}
      </section>
    </>
  );
};

export default Board;
