import { Grid3x3, ArrowLeft, Play } from 'lucide-react';
import { useState } from 'react';

interface GridSetupPageProps {
  onStartGame: (rows: number, cols: number) => void;
  onBack: () => void;
}

export default function GridSetupPage({ onStartGame, onBack }: GridSetupPageProps) {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(6);

  const gridOptions = [
    { rows: 4, cols: 4, label: '4×4', difficulty: 'Easy' },
    { rows: 4, cols: 6, label: '4×6', difficulty: 'Medium' },
    { rows: 6, cols: 6, label: '6×6', difficulty: 'Hard' },
    { rows: 6, cols: 8, label: '6×8', difficulty: 'Expert' },
    { rows: 8, cols: 8, label: '8×8', difficulty: 'Master' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back</span>
        </button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Grid3x3 className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">Choose Grid Size</h1>
          </div>
          <p className="text-xl text-white/90">Select your preferred difficulty level</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {gridOptions.map((option) => (
            <button
              key={`${option.rows}-${option.cols}`}
              onClick={() => {
                setRows(option.rows);
                setCols(option.cols);
              }}
              className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                rows === option.rows && cols === option.cols
                  ? 'ring-4 ring-yellow-400 scale-105'
                  : ''
              }`}
            >
              <div className="text-3xl font-bold text-gray-800 mb-2">{option.label}</div>
              <div className="text-sm text-gray-600">{option.difficulty}</div>
              <div className="text-xs text-gray-500 mt-1">
                {(option.rows * option.cols) / 2} pairs
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => onStartGame(rows, cols)}
            className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
