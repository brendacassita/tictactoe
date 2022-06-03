import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const initBoard = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [board, setBoard] = useState(initBoard);
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWin = (currentBoard) => {
    // console.log("checkwin");
    let winner = null;
    
    console.log("board", currentBoard);
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];
    for (let i = 0; i < winningCombos.length; i++) {
      let [i1, i2, i3] = winningCombos[i];
      if (
        currentBoard[i1] !== "" &&
        currentBoard[i1] === currentBoard[i2] &&
        currentBoard[i1] === currentBoard[i3]
      ) {
        winner = currentBoard[i1];
        break;
      }
    }
    return winner;
  };
  const handleClick = (index) => {
     console.log("clicked item:", index);
    
    if (board[index] !== "" || winner) {
      // stops the function here
      return;
    }
    // set game piece
    // RULE: with react state you can't directly mutate state.
    // YOU NEED GO THROW SETSTATE TO CHANGE STATE
    // board[index] =  xTurn ? 'X' : '0' BAD!!
    let boardClone = [...board];
    boardClone[index] = xTurn ? "X" : "0"; //GOOD!! doesn;t mutate state

    // console.log("about to setBoard with boardClone", boardClone);
    // async
    setBoard(boardClone);
    // BOARD IS NOT SET YET IT WILL BE BY THE TIME IT RENDERS!!!
    // console.log("board", board);
    // check win
    if(checkWin(boardClone)){
      let winner = xTurn ? "X":"O"
      setWinner(winner)
    } else{
      setXTurn(!xTurn);
    }
  };
  const renderBoard = () => {
   
    return board.map((piece, index) => {
      return (
        <div key={index} onClick={() => handleClick(index)} className="box">
          {piece}
        </div>
      );
    });
  };

  const reset = () => {
    setBoard(initBoard);
    setWinner(null);
    setXTurn(!xTurn);
  };
  return (
    <div className="App">

      <h1>Tic Tac Toe</h1>
      {winner && <h1>{winner} won</h1>}
      <button onClick={reset}>reset</button> 
      <br/><br/>
      <div className="game-board">{renderBoard()}</div>
    </div>
  );
}

export default App;