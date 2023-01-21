import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [result, setResult] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setplayer] = useState("X");
  const [gameOn, setGameOn] = useState(true);
  const [gameDraw, setGameDraw] = useState(false);

  useEffect(() => {
    if (checkForWinner()) {
      setGameOn(false);
    }
    if (result.filter((item) => item !== "").length === 9) {
      setGameOn(false);
      setGameDraw(true);
    }
  }, [result]);

  const checkForWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition = 0; condition < winConditions.length; condition++) {
      if (
        (result[winConditions[condition][0]] === "X" &&
          result[winConditions[condition][1]] === "X" &&
          result[winConditions[condition][2]] === "X") ||
        (result[winConditions[condition][0]] === "O" &&
          result[winConditions[condition][1]] === "O" &&
          result[winConditions[condition][2]] === "O")
      ) {
        console.log("Hello");
        return true;
      }
    }
    return false;
  };

  const handleClick = (index) => {
    if (!result[index] && gameOn) {
      const newResult = result.map((item, thisIndex) =>
        thisIndex === index ? player : item
      );
      setplayer(player === "X" ? "O" : "X");
      setResult(newResult);
    }
  };

  const getMessage = () => {
    if (gameOn) {
      return `Player ${player}'s turn`;
    } else {
      return gameDraw ? `Game Draw` : `Winner is ${player === "X" ? "O" : "X"}`;
    }
  };

  return (
    <div className="App">
      {result.map((item, index) => (
        <div key={index} className="box" onClick={() => handleClick(index)}>
          {item}
        </div>
      ))}
      {getMessage()}
    </div>
  );
}
