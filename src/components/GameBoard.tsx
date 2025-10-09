import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card as CardType } from '../types/game';
import Card from './Card';
import PlayerAvatar from './PlayerAvatar';
import { soundManager } from '../utils/sounds';

interface GameBoardProps {
  playerCount: number;
  gridSize: { rows: number; cols: number };
  onGameEnd: (scores: number[]) => void;
  onBack: () => void;
}

const cardSymbols = [
  '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🍔', '🎺', '🎻',
  '🎲', '🎰', '⭐', '🎳', '🦧', '🏀', '🐶', '⚾', '🎾',
  '🏐', '🍎', '🎱', '🏓', '🏸', '👄', '🏑', '🥊', '🥋',
  '⛳', '🎿', '🛹', '🐞', '🛸', '🍫', '🏝️', '💎', '🍅',
  '💩', '💀', '👻', '🤡'
];

// 🔹 Generate card pairs
function generateCards(rows: number, cols: number): CardType[] {
  const totalCards = rows * cols;
  const pairCount = totalCards / 2;
  const selectedSymbols = cardSymbols.slice(0, pairCount);
  const cardPairs = [...selectedSymbols, ...selectedSymbols];
  const shuffled = cardPairs.sort(() => Math.random() - 0.5);

  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
}



export default function GameBoard({ playerCount, gridSize, onGameEnd, onBack }: GameBoardProps) {
  // previous player state removed (unused)
  const [cards, setCards] = useState<CardType[]>(() => generateCards(gridSize.rows, gridSize.cols));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(playerCount).fill(0));
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsProcessing(true);
      const [first, second] = flippedIndices;

      if (cards[first].symbol === cards[second].symbol) {
        soundManager.match();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second
                ? { ...card, isMatched: true }
                : card
            )
          );
          setScores((prev) => {
            const newScores = [...prev];
            newScores[currentPlayer]++;
            return newScores;
          });
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 800);
      } else {
        soundManager.unflip();
        setTimeout(() => {
          // previous player tracking removed
          setCards((prev) =>
            prev.map((card, index) =>
              index === first || index === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
          setCurrentPlayer((prev) => (prev + 1) % playerCount);
          setIsProcessing(false);
        }, 1200);
      }
    }
  }, [flippedIndices, cards, currentPlayer, playerCount]);

  useEffect(() => {
    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && cards.length > 0) {
      setTimeout(() => {
        onGameEnd(scores);
      }, 500);
    }
  }, [cards, scores, onGameEnd]);

  const handleCardClick = (index: number) => {
    if (isProcessing || flippedIndices.length >= 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    soundManager.flip();
    setCards((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndices((prev) => [...prev, index]);
  };

  const avatarPositions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];

  const calculateCardSize = () => {
    const maxGridWidth = Math.min(window.innerWidth * 0.8, 800);
    const maxGridHeight = Math.min(window.innerHeight * 0.7, 600);
    const cardWidth = Math.floor(maxGridWidth / gridSize.cols) - 12;
    const cardHeight = Math.floor(maxGridHeight / gridSize.rows) - 12;
    return Math.min(cardWidth, cardHeight, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center overflow-hidden relative">
      {/* 🔙 Back Button (moved to top-center) */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => {
            soundManager.click();
            onBack();
          }}
          className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* 🔹 Player Avatars */}
      {Array.from({ length: Math.min(playerCount, 4) }).map((_, index) => (
        <PlayerAvatar
          key={index}
          playerNumber={index}
          isActive={currentPlayer === index}
          score={scores[index]}
          position={avatarPositions[index]}
        />
      ))}

      {/* Render 5th player at bottom-center if playerCount is 5 */}
      {playerCount === 5 && (
        <PlayerAvatar
          key={4}
          playerNumber={4}
          isActive={currentPlayer === 4}
          score={scores[4]}
          position="bottom-center"
        />
      )}

      {/* 🔹 Game Grid */}
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, ${calculateCardSize()}px)`,
          gridTemplateRows: `repeat(${gridSize.rows}, ${calculateCardSize()}px)`,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
