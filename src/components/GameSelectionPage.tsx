import { ArrowLeft } from 'lucide-react';

interface GameSelectionPageProps {
  onSelectGame: (game: string) => void;
  onBack: () => void;
}

export default function GameSelectionPage({ onSelectGame, onBack }: GameSelectionPageProps) {
  const games = [
    {
      id: 'memory-match',
      name: 'Memory Match',
      description: 'Find matching pairs and test your memory',
      image: 'pair.png', // 👈 Add your image path from public folder
    },
    
    // Add more games here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">Choose Your Game</h1>
          <p className="text-xl text-white/90">Select a game mode to continue</p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Game Info */}
              <div className="p-6 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">{game.name}</div>
                <div className="text-sm text-gray-600">{game.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
