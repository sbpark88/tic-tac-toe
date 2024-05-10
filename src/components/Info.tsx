import React, { FunctionComponent } from "react";

interface Props {
  turn: number;
  backToTurn: (turnNumber: number) => void;
  winner: string | null;
  currentPlayer: string;
  currentHistory: string[];
  turnCheckHandler: (squareIndex: number) => void;
}

const Info: FunctionComponent<Props> = ({ turn, backToTurn }) => {
  return (
    <section className="game-info">
      {Array.from({ length: turn }).map((_, index) => (
        <Button key={index} turnNumber={index} handler={backToTurn} />
      ))}
    </section>
  );
};

export default Info;

interface ButtonProps {
  turnNumber: number;
  handler: (turnNumber: number) => void;
}

const Button: FunctionComponent<ButtonProps> = ({ turnNumber, handler }) => {
  return (
    <button onClick={() => handler(turnNumber)}>
      {turnNumber === 0 ? "Reset" : `Back to history #${turnNumber}`}
    </button>
  );
};
