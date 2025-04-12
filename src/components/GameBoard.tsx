
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import GameCell from "./GameCell";
import GameStatus from "./GameStatus";
import GameControls from "./GameControls";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { checkWinner, makeComputerMove } from "@/lib/game-logic";

type Player = "X" | "O" | null;
type GameMode = "player" | "computer";

interface GameBoardProps {
  initialGameMode?: GameMode;
}

const GameBoard: React.FC<GameBoardProps> = ({ initialGameMode = "player" }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [gameMode, setGameMode] = useState<GameMode>(initialGameMode);
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Use the initialGameMode when component mounts
  useEffect(() => {
    changeGameMode(initialGameMode);
  }, [initialGameMode]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningCells([]);
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Ignore clicks if cell is filled or there's a winner or computer is thinking
    if (board[index] || winner || isComputerThinking) return;

    // Update board with player's move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for winner or draw
    const result = checkWinner(newBoard);
    if (result.winner) {
      setWinner(result.winner);
      setWinningCells(result.winningCells || []);
      updateScores(result.winner);
      celebrateWin(result.winner);
    } else if (!newBoard.includes(null)) {
      setWinner("draw");
      updateScores("draw");
      toast("It's a draw!");
    } else if (gameMode === "computer" && currentPlayer === "X") {
      // Computer's turn
      setCurrentPlayer("O");
      setIsComputerThinking(true);
      
      // Delay computer move for more natural feel
      setTimeout(() => {
        const computerMoveIndex = makeComputerMove(newBoard);
        const boardAfterComputerMove = [...newBoard];
        boardAfterComputerMove[computerMoveIndex] = "O";
        setBoard(boardAfterComputerMove);
        
        // Check if computer won
        const computerResult = checkWinner(boardAfterComputerMove);
        if (computerResult.winner) {
          setWinner(computerResult.winner);
          setWinningCells(computerResult.winningCells || []);
          updateScores(computerResult.winner);
          celebrateWin(computerResult.winner);
        } else if (!boardAfterComputerMove.includes(null)) {
          setWinner("draw");
          updateScores("draw");
          toast("It's a draw!");
        } else {
          setCurrentPlayer("X");
        }
        
        setIsComputerThinking(false);
      }, 600); // Delay for computer "thinking"
    } else {
      // Switch players in 2-player mode
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Update scores
  const updateScores = (result: Player | "draw") => {
    if (result === "X" || result === "O") {
      setScores(prev => ({
        ...prev,
        [result]: prev[result] + 1
      }));
    } else if (result === "draw") {
      setScores(prev => ({
        ...prev,
        draw: prev.draw + 1
      }));
    }
  };

  // Celebrate win with toast and animation
  const celebrateWin = (winner: Player) => {
    toast(`${winner} wins!`, {
      description: "Great game!",
      duration: 3000,
    });
  };

  // Change game mode
  const changeGameMode = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
    setScores({ X: 0, O: 0, draw: 0 });
    
    if (mode === "computer") {
      toast("Playing against computer", {
        description: "You are X, computer is O",
      });
    } else {
      toast("2-Player mode activated", {
        description: "Take turns with a friend",
      });
    }
  };

  // Game status message
  const getStatusMessage = () => {
    if (winner) {
      return winner === "draw" 
        ? "It's a draw!" 
        : `${winner} wins!`;
    }
    
    if (isComputerThinking) {
      return "Computer is thinking...";
    }
    
    return `${currentPlayer}'s turn`;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-primary mb-2">Tic Tac Toe</h1>
        <p className="text-muted-foreground">Play against a friend or the computer</p>
      </motion.div>

      <div className="space-y-4">
        <GameControls 
          gameMode={gameMode} 
          onChangeGameMode={changeGameMode}
          onResetGame={resetGame}
          isGameActive={board.some(cell => cell !== null) && !winner}
        />
        
        <GameStatus 
          scores={scores}
          currentPlayer={currentPlayer}
          isComputerThinking={isComputerThinking}
          statusMessage={getStatusMessage()}
        />
        
        <motion.div
          layout
          className={cn(
            "board-grid w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl shadow-lg",
            winner && "opacity-90"
          )}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {board.map((cell, index) => (
            <GameCell
              key={index}
              value={cell}
              onClick={() => handleCellClick(index)}
              isWinningCell={winningCells.includes(index)}
              isDisabled={!!winner || isComputerThinking}
            />
          ))}
        </motion.div>
        
        {/* Post-game actions */}
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
          >
            <Button 
              onClick={resetGame}
              className="flex items-center gap-2"
              size="lg"
            >
              <RefreshCw size={18} />
              Play Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
              size="lg"
            >
              <Home size={18} />
              Main Menu
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
