interface CardProps {
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function Card({ symbol, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className="relative w-full h-full hover:scale-105 transition-transform duration-200"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full h-full transition-all duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped || isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-xl flex items-center justify-center border-4 border-white/80"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-400">?</div>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full rounded-2xl shadow-2xl flex items-center justify-center border-4 transition-all duration-300 ${
            isMatched
              ? 'bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 border-emerald-300'
              : 'bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 border-cyan-300'
          }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl ${
              isMatched ? 'scale-110' : ''
            } transition-transform`}
          >
            {symbol}
          </div>
        </div>
      </div>
    </button>
  );
}
