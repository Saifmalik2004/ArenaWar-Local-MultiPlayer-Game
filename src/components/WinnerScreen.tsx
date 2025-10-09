import { useEffect } from 'react';
import { Trophy, Home, RotateCcw } from 'lucide-react';
import Confetti from './Confetti';
import { soundManager } from '../utils/sounds';

interface WinnerScreenProps {
  scores: number[];
  onPlayAgain: () => void;
  onBackHome: () => void;
}

const playerColors = [
  'from-red-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-amber-500',
  'from-purple-400 to-fuchsia-500',
];

export default function WinnerScreen({ scores, onPlayAgain, onBackHome }: WinnerScreenProps) {
  const maxScore = Math.max(...scores);
  const winners = scores
    .map((score, index) => ({ player: index, score }))
    .filter((item) => item.score === maxScore);

  const sortedPlayers = scores
    .map((score, index) => ({ player: index, score }))
    .sort((a, b) => b.score - a.score);

  useEffect(() => {
    soundManager.win();
  }, []);

  const publicDefaults = [
    '/9061205-removebg-preview.png',
    '/giraffe-cartoon-character-vector_1308-154177-removebg-preview.png',
    '/hmmy_mkkj_220609-removebg-preview.png',
    '/mon-Photoroom.png',
    '/vector-cartoon-illustration-smiling-turtle-face-isolated_1639-51757-Photoroom.png',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center p-6 relative overflow-hidden">
      <Confetti />

      <div className="max-w-2xl w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Winner Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Trophy */}
              <Trophy className="w-24 h-24 text-yellow-500" />

              {/* Winner Avatar */}
              <div className="flex gap-4">
                {winners.map((winner) => {
                  const resolvedPath = publicDefaults[winner.player] ?? publicDefaults[0];
                  return (
                    <div key={winner.player} className="w-24 h-24 md:w-28 md:h-28">
                      <img
                        src={resolvedPath}
                        alt={`Player ${winner.player + 1} avatar`}
                        className="w-full h-full object-cover rounded-full drop-shadow-xl border-4 border-yellow-400"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Winner Text */}
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mt-6 mb-3">
              {winners.length > 1 ? "It's a Tie!" : 'Winner!'}
            </h1>
            {winners.length === 1 ? (
              <p className="text-3xl font-bold text-purple-600">
                Player {winners[0].player + 1}
              </p>
            ) : (
              <p className="text-2xl font-bold text-purple-600">
                Players {winners.map((w) => w.player + 1).join(' & ')}
              </p>
            )}
          </div>

          {/* Final Scores */}
          <div className="space-y-3 mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Final Scores
            </h2>
            {sortedPlayers.map(({ player, score }, index) => {
              const resolvedPath = publicDefaults[player] ?? publicDefaults[0];
              return (
                <div
                  key={player}
                  className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${
                    playerColors[player]
                  } ${index === 0 ? 'ring-4 ring-yellow-400' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Small Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={resolvedPath}
                        alt={`Player ${player + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Player name and optional trophy */}
                    <div className="flex items-center gap-2">
                      {index === 0 && <Trophy className="w-5 h-5 text-yellow-300" />}
                      <span className="text-white font-bold text-lg">
                        Player {player + 1}
                      </span>
                    </div>
                  </div>
                  <span className="text-white font-bold text-2xl">{score}</span>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </button>
            <button
              onClick={onBackHome}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
