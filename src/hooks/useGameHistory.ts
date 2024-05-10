import { useCallback, useEffect, useState } from "react";

const WINNING_CASE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function useGameHistory() {
  const [turn, setTurn] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameHistory, setGameHistory] = useState<string[][]>([
    Array(9).fill(null),
  ]);
  const currentHistory = gameHistory[turn];
  const currentPlayer = turn % 2 === 0 ? "X" : "O";
  const [lastPosition, setLastPosition] = useState<number>();

  const backToTurn = useCallback(
    (turnNumber: number) => {
      setTurn(turnNumber);
      setGameHistory(gameHistory.slice(0, turnNumber + 1));
      setWinner(null);
    },
    [gameHistory],
  );

  const nextTurn = useCallback(() => {
    setTurn(turn + 1);
  }, [turn]);

  const isWinner = useCallback(
    (squareIndex: number) => {
      const testCase = WINNING_CASE.filter((test) =>
        isWinningCase(test, squareIndex),
      );
      console.log(currentHistory);
      for (const test of testCase) {
        const [idx1, idx2, idx3] = test;
        const winner =
          currentHistory[idx1] !== null &&
          currentHistory[idx1] === currentHistory[idx2] &&
          currentHistory[idx2] === currentHistory[idx3];

        if (winner) return true;
      }
      return false;
    },
    [currentHistory],
  );

  const turnCheckHandler = useCallback(
    (squareIndex: number) => {
      const gameEnd = winner !== null;
      const alreadyChecked = currentHistory[squareIndex] !== null;
      if (alreadyChecked || gameEnd) return;
      setGameHistory((prevState) => {
        const _currentHistory = [...currentHistory];
        _currentHistory[squareIndex] = currentPlayer;
        return [...prevState, _currentHistory];
      });
      setLastPosition(squareIndex);
      nextTurn();
    },
    [currentPlayer, currentHistory, winner, nextTurn],
  );

  useEffect(() => {
    if (lastPosition === undefined) return;
    if (isWinner(lastPosition)) {
      const previousPlayer = currentPlayer === "X" ? "O" : "X";
      setWinner(previousPlayer);
    }
  }, [lastPosition, currentPlayer, isWinner]);

  return {
    turn,
    backToTurn,
    winner,
    currentPlayer,
    currentHistory,
    turnCheckHandler,
  };
}

function isWinningCase(test: number[], squareIndex: number): boolean {
  const contain = test.find((position) => position === squareIndex);
  return contain !== undefined;
}
