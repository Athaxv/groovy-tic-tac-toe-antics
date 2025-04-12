
type Player = "X" | "O" | null;

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// Check if there's a winner
export function checkWinner(board: Player[]) {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCells: combo,
      };
    }
  }
  return { winner: null, winningCells: [] };
}

// Computer AI for making moves
export function makeComputerMove(board: Player[]): number {
  // Check if computer can win
  const winningMove = findWinningMove(board, "O");
  if (winningMove !== -1) {
    return winningMove;
  }
  
  // Block player from winning
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove !== -1) {
    return blockingMove;
  }
  
  // Take center if available
  if (board[4] === null) {
    return 4;
  }
  
  // Take corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(pos => board[pos] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available edge
  const edges = [1, 3, 5, 7];
  const availableEdges = edges.filter(pos => board[pos] === null);
  if (availableEdges.length > 0) {
    return availableEdges[Math.floor(Math.random() * availableEdges.length)];
  }
  
  // If no move found (shouldn't happen in practice), pick first available
  const availableMoves = board.map((cell, index) => cell === null ? index : -1).filter(pos => pos !== -1);
  return availableMoves[0];
}

// Helper function to find a winning move for a player
function findWinningMove(board: Player[], player: Player): number {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    // Check if two positions are filled by the player and the third is empty
    if (board[a] === player && board[b] === player && board[c] === null) {
      return c;
    }
    if (board[a] === player && board[c] === player && board[b] === null) {
      return b;
    }
    if (board[b] === player && board[c] === player && board[a] === null) {
      return a;
    }
  }
  return -1;
}
