import logo from './logo.svg';
import './App.css';
import {useState} from "react"

const initBoard = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [board, setBoard] = useState(initBoard)
  return (
    <div className="App">
      <div className="game-board">
        {renderBoard()}
      </div>
     
    </div>
  );
}

export default App;
