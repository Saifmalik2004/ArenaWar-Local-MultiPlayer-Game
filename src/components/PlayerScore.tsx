import { Crown } from 'lucide-react';

interface PlayerScoreProps {
  playerCount: number;
  currentPlayer: number;
  scores: number[];
}

const playerColors = [
  'from-red-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-amber-500',
  'from-pink-400 to-fuchsia-500',
];

export default function PlayerScore({ playerCount, currentPlayer, scores }: PlayerScoreProps) {
  return (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${playerCount}, 1fr)` }}>
        {Array.from({ length: playerCount }).map((_, index) => (
          <div
            key={index}
            className={`relative rounded-xl p-4 transition-all duration-300 ${
              currentPlayer === index
                ? 'bg-gradient-to-br ' + playerColors[index] + ' scale-105 shadow-lg'
                : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`font-bold text-lg ${
                    currentPlayer === index ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  Player {index + 1}
                </div>
                <div
                  className={`text-3xl font-bold ${
                    currentPlayer === index ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {scores[index]}
                </div>
              </div>
              {currentPlayer === index && (
                <Crown className="w-8 h-8 text-yellow-300 animate-pulse" />
              )}
            </div>
            {currentPlayer === index && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                Your Turn!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
