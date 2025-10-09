import { useState } from 'react';
import HomePage from './components/HomePage';
import GameSelectionPage from './components/GameSelectionPage';
import GridSetupPage from './components/GridSetupPage';
import GameBoard from './components/GameBoard';
import WinnerScreen from './components/WinnerScreen';
import { GamePage } from './types/game';

function App() {
  const [currentPage, setCurrentPage] = useState<GamePage>('home');
  const [playerCount, setPlayerCount] = useState(2);
  const [gridSize, setGridSize] = useState({ rows: 4, cols: 6 });
  const [finalScores, setFinalScores] = useState<number[]>([]);

  const handleSelectPlayers = (count: number) => {
    setPlayerCount(count);
    setCurrentPage('game-selection');
  };

  const handleSelectGame = () => {
    setCurrentPage('grid-setup');
  };

  const handleStartGame = (rows: number, cols: number) => {
    setGridSize({ rows, cols });
    setCurrentPage('game-board');
  };

  const handleGameEnd = (scores: number[]) => {
    setFinalScores(scores);
    setCurrentPage('winner');
  };

  const handlePlayAgain = () => {
    setCurrentPage('grid-setup');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setPlayerCount(2);
    setGridSize({ rows: 4, cols: 6 });
    setFinalScores([]);
  };

  return (
    <>
      {currentPage === 'home' && <HomePage onSelectPlayers={handleSelectPlayers} />}

      {currentPage === 'game-selection' && (
        <GameSelectionPage
          onSelectGame={handleSelectGame}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'grid-setup' && (
        <GridSetupPage
          onStartGame={handleStartGame}
          onBack={() => setCurrentPage('game-selection')}
        />
      )}

      {currentPage === 'game-board' && (
        <GameBoard
          playerCount={playerCount}
          gridSize={gridSize}
          onGameEnd={handleGameEnd}
          onBack={() => setCurrentPage('grid-setup')}
        />
      )}

      {currentPage === 'winner' && (
        <WinnerScreen
          scores={finalScores}
          onPlayAgain={handlePlayAgain}
          onBackHome={handleBackHome}
        />
      )}
    </>
  );
}

export default App;
