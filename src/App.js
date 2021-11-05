import React, { useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import GameBoard from "./components/game-board/GameBoard";
import LeaderBoard from "./components/Leader-board/LeaderBoard";

function App() {
  const [winners , setWinners] = useState([]);
  const handleSetWinners = (winnerList) => {
   setWinners(winnerList.reverse());
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <GameBoard onSetWinners={handleSetWinners}/>
      </ErrorBoundary>
      <ErrorBoundary>
        <LeaderBoard onSetWinners={handleSetWinners} winners={winners}/>
      </ErrorBoundary>
    </div>
  );
}

export default App;
