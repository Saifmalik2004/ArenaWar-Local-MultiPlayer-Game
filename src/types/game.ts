export type GamePage = 'home' | 'game-selection' | 'grid-setup' | 'game-board' | 'winner';

export interface GameState {
  currentPage: GamePage;
  playerCount: number;
  gridSize: { rows: number; cols: number };
  cards: Card[];
  currentPlayer: number;
  scores: number[];
  flippedCards: number[];
  matchedCards: number[];
}

export interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}
