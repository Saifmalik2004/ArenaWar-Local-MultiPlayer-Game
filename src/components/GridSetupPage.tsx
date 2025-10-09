import { Grid3x3, ArrowLeft, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GridSetupPageProps {
  onStartGame: (rows: number, cols: number) => void;
  onBack: () => void;
}

// Custom hook to get window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function GridSetupPage({ onStartGame, onBack }: GridSetupPageProps) {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const { width } = useWindowSize();

  // Define grid options based on screen size
  const getGridOptions = () => {
    if (width < 640) {
      // Mobile: Smaller grids for easier tapping
      return [
        { rows: 4, cols: 4, label: '4×4', difficulty: 'Easy' },
        { rows: 6, cols: 4, label: '6×4', difficulty: 'Medium' },
        { rows: 8, cols: 5, label: '8×5', difficulty: 'Hard' },
      ];
    } else if (width < 1024) {
      // Tablet: Medium grids
      return [
        { rows: 5, cols: 6, label: '5×6', difficulty: 'Easy' },
        { rows: 8, cols: 6, label: '8×6', difficulty: 'Medium' },
        { rows: 8, cols: 8, label: '8×8', difficulty: 'Hard' },
      ];
    } else {
      // Desktop: Larger grids
      return [
        { rows: 4, cols: 6, label: '4×6', difficulty: 'Easy' },
        { rows: 5, cols: 10, label: '5×10', difficulty: 'Medium' },
        { rows: 6, cols: 10, label: '6×10', difficulty: 'Hard' },
        { rows: 6, cols: 12, label: '6×12', difficulty: 'Master' },
      ];
    }
  };

  const gridOptions = getGridOptions();

  // Set default rows/cols based on screen size
  useEffect(() => {
    const defaultOption = gridOptions[0];
    setRows(defaultOption.rows);
    setCols(defaultOption.cols);
  }, [width]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        <button
          onClick={onBack}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base sm:text-lg">Back</span>
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid3x3 className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
            <h1 className="text-3xl sm:text-5xl font-bold text-white">Choose Grid Size</h1>
          </div>
          <p className="text-lg sm:text-xl text-white/90">Select your preferred difficulty level</p>
        </div>

        <div
          className={`grid gap-4 mb-6 sm:mb-8 ${
            width < 640
              ? 'grid-cols-1'
              : width < 1024
              ? 'grid-cols-2 md:grid-cols-3'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}
        >
          {gridOptions.map((option) => (
            <button
              key={`${option.rows}-${option.cols}`}
              onClick={() => {
                setRows(option.rows);
                setCols(option.cols);
              }}
              className={`group bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                rows === option.rows && cols === option.cols
                  ? 'ring-4 ring-yellow-400 scale-105'
                  : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {option.label}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{option.difficulty}</div>
              <div className="text-xs text-gray-500 mt-1">
                {(option.rows * option.cols) / 2} pairs
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onStartGame(rows, cols)}
            className="group bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}