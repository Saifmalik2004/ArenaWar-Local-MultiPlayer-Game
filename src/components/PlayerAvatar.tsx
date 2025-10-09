import React from 'react';

interface PlayerAvatarProps {
  playerNumber: number;
  isActive: boolean;
  score: number;
  position:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  avatarPath?: string;
}

const playerColors = [
  'from-red-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-green-400 to-emerald-500',
  'from-yellow-400 to-amber-500',
  'from-purple-400 to-fuchsia-500',
];

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export default function PlayerAvatar({
  playerNumber,
  isActive,
  score,
  position,
  avatarPath,
}: PlayerAvatarProps) {
  const publicDefaults = [
    '/9061205-removebg-preview.png',
    '/giraffe-cartoon-character-vector_1308-154177-removebg-preview.png',
    '/hmmy_mkkj_220609-removebg-preview.png',
    '/mon-Photoroom.png',
    '/vector-cartoon-illustration-smiling-turtle-face-isolated_1639-51757-Photoroom.png',
  ];

  const resolvedPath =
    avatarPath ?? publicDefaults[playerNumber] ?? publicDefaults[0];

  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`fixed ${positionClasses[position]} z-20 transition-all duration-500 ${
        isActive ? 'opacity-100' : 'opacity-70'
      }`}
    >
      {/* 🖥️ For medium and larger screens */}
      <div
        className={`hidden md:block relative bg-gradient-to-br ${
          playerColors[playerNumber]
        } rounded-2xl shadow-2xl p-4 min-w-[100px] ${
          isActive ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''
        }`}
      >
        {isActive && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            Turn!
          </div>
        )}

        {position === 'bottom-center' ? (
          <div className="flex items-center gap-4 px-4">
            <div
              className={`w-16 h-16 overflow-hidden rounded-full ${
                isActive ? 'animate-bounce' : ''
              }`}
            >
              <img
                src={resolvedPath}
                alt={`Player ${playerNumber + 1} avatar`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-white font-bold text-sm">
                P{playerNumber + 1}
              </div>
              <div className="text-white font-bold text-2xl">S-{score}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className={`w-16 h-16 overflow-hidden rounded-full ${
                isActive ? 'animate-bounce' : ''
              }`}
            >
              <img
                src={resolvedPath}
                alt={`Player ${playerNumber + 1} avatar`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            </div>
            <div className="text-white font-bold text-sm">
              P{playerNumber + 1}
            </div>
            <div className="text-white font-bold text-2xl">S-{score}</div>
          </div>
        )}
      </div>

      {/* 📱 For small screens - Compact avatar */}
      <div
        className={`md:hidden flex items-center gap-2 bg-black/40 backdrop-blur-sm px-2 py-1 shadow-sm ${
          isActive ? 'ring-2 ring-yellow-300' : ''
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full overflow-hidden ${
            isActive ? 'animate-bounce' : ''
          }`}
        >
          <img
            src={resolvedPath}
            alt={`Player ${playerNumber + 1} avatar`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white text-xs font-semibold">
            P{playerNumber + 1}
          </span>
          <span className="text-white text-sm font-bold">S-{score}</span>
        </div>
      </div>
    </div>
  );
}
