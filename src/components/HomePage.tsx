import { Users, Github, Linkedin, Instagram } from "lucide-react";

interface HomePageProps {
  onSelectPlayers: (count: number) => void;
}

export default function HomePage({ onSelectPlayers }: HomePageProps) {
  const playerOptions = [
    {
      count: 2,
      image: "/playerImage/twoPlayer.jpg",
      label: "2 Players",
    },
    {
      count: 3,
      image: "/playerImage/threePlayer.png",
      label: "3 Players",
    },
    {
      count: 4,
      image: "/playerImage/fourPlayer.png",
      label: "4 Players",
    },
    {
      count: 5,
      image: "/playerImage/fivePlayer.png",
      label: "5 Players",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-600 to-fuchsia-600 flex flex-col items-center justify-between">
      {/* Top Section */}
      <div className="text-center mt-10 px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src="/logo.png" // 👈 Your logo image from public folder (e.g., /public/logo.png)
            alt="Arena Logo"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
          <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">
            Arena
          </h1>
        </div>
        <p className="text-xl text-white/90 font-light">
          Choose the number of players to begin your game
        </p>
      </div>

      {/* Player Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-10 w-full max-w-6xl">
        {playerOptions.map(({ count, image, label }) => (
          <button
            key={count}
            onClick={() => onSelectPlayers(count)}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
          >
            {/* Image */}
            <img
              src={image}
              alt={label}
              className="w-full h-64 object-cover group-hover:brightness-110 transition-all duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-500"></div>

            {/* Label */}
             <div className="absolute bottom-3 left-0 right-0 text-center text-white">
        <div className="text-2xl font-bold drop-shadow-lg">{label}</div>
        <p className="text-sm opacity-90">Click to Play</p>
      </div>
          </button>
        ))}
      </div>

      {/* Footer */}
     <footer className="w-full py-8 bg-black/20 backdrop-blur-md">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
    {/* Center text */}
    <p className="text-white text-lg font-medium text-center flex-1">
      Made with ❤️ by <span className="font-bold text-yellow-300">Saif</span>
    </p>

    {/* Social icons on the right */}
    <div className="flex space-x-4">
      <a
        href="https://github.com/Saifmalik2004"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://www.linkedin.com/in/saif-malik7827/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="https://www.instagram.com/the_lucifer_morningstarr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-300 transition"
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}
