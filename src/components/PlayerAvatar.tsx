import React from 'react';

interface PlayerAvatarProps {
  playerNumber: number;
  isActive: boolean;
  score: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  avatarPath?: string; // optional local path (e.g., /avatars/player1.png or imported asset)
}

const PlayerSVGs = [
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#EF4444" stroke="white" strokeWidth="3"/>
      <circle cx="35" cy="40" r="5" fill="white"/>
      <circle cx="65" cy="40" r="5" fill="white"/>
      <path d="M 30 65 Q 50 75 70 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#3B82F6" stroke="white" strokeWidth="3"/>
      <circle cx="35" cy="40" r="5" fill="white"/>
      <circle cx="65" cy="40" r="5" fill="white"/>
      <path d="M 30 60 Q 50 70 70 60" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#10B981" stroke="white" strokeWidth="3"/>
      <circle cx="35" cy="40" r="5" fill="white"/>
      <circle cx="65" cy="40" r="5" fill="white"/>
      <path d="M 30 65 Q 50 55 70 65" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FBBF24" stroke="white" strokeWidth="3"/>
      <circle cx="35" cy="40" r="5" fill="white"/>
      <circle cx="65" cy="40" r="5" fill="white"/>
      <circle cx="50" cy="60" r="3" fill="white"/>
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#A855F7" stroke="white" strokeWidth="3"/>
      <circle cx="35" cy="40" r="5" fill="white"/>
      <circle cx="65" cy="40" r="5" fill="white"/>
      <path d="M 35 65 L 65 65" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  ),
];

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

export default function PlayerAvatar({ playerNumber, isActive, score, position, avatarPath }: PlayerAvatarProps) {
  const AvatarSVG = PlayerSVGs[playerNumber];

  // Default public images mapped by player number (0-based)
  const publicDefaults = [
    '/9061205-removebg-preview.png',
    '/giraffe-cartoon-character-vector_1308-154177-removebg-preview.png',
    '/hmmy_mkkj_220609-removebg-preview.png',
    '/mon-Photoroom.png',
    '/vector-cartoon-illustration-smiling-turtle-face-isolated_1639-51757-Photoroom.png',
  ];

  // Resolve which image path to use: explicit avatarPath prop, or mapped public image by playerNumber
  const resolvedPath = avatarPath ?? publicDefaults[playerNumber] ?? publicDefaults[0];

  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`fixed ${positionClasses[position]} z-20 transition-all duration-500 ${
       isActive ? 'opacity-100' : 'opacity-70'
      }`}
    >
      <div
        className={`relative bg-gradient-to-br ${
          playerColors[playerNumber]
        } rounded-2xl shadow-2xl p-4 min-w-[100px] ${
          isActive ? 'ring-4 ring-white ring-offset-2 ring-offset-transparent' : ''
        }`}
      >
        {isActive && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            Turn!
          </div>
        )}
        {position === 'bottom-center' ? (
          // Horizontal / wide layout for 5th player
          <div className="flex items-center gap-4 px-4 py-2">
            <div className={`w-20 h-16 overflow-hidden rounded-full ${isActive ? 'animate-bounce' : ''}`}>
              {resolvedPath && !imgError ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={resolvedPath}
                  alt={`Player ${playerNumber + 1} avatar`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <AvatarSVG className="w-full h-full" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-white font-bold text-sm">P{playerNumber + 1}</div>
              <div className="text-white font-bold text-2xl">{score}</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 overflow-hidden rounded-full ${isActive ? 'animate-bounce' : ''}`}>
              {resolvedPath && !imgError ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img
                  src={resolvedPath}
                  alt={`Player ${playerNumber + 1} avatar`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <AvatarSVG className="w-full h-full" />
              )}
            </div>
            <div className="text-white font-bold text-sm">P{playerNumber + 1}</div>
            <div className="text-white font-bold text-2xl">{score}</div>
          </div>
        )}
      </div>
    </div>
  );
}
