
import React from "react";
import { motion } from "framer-motion";
import { CircleDot, X, Circle } from "lucide-react";

type GameStatusProps = {
  scores: { X: number; O: number; draw: number };
  currentPlayer: "X" | "O" | null;
  isComputerThinking: boolean;
  statusMessage: string;
};

const GameStatus: React.FC<GameStatusProps> = ({
  scores,
  currentPlayer,
  isComputerThinking,
  statusMessage
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md mb-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-game-x-color">
          <X size={20} />
          <span className="font-bold">{scores.X}</span>
        </div>
        
        <div className="flex items-center gap-2 text-game-o-color">
          <Circle size={20} />
          <span className="font-bold">{scores.O}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <CircleDot size={20} />
          <span className="font-bold">{scores.draw}</span>
        </div>
      </div>
      
      <motion.div
        className="bg-muted rounded-lg p-2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={statusMessage} // Re-animate when message changes
      >
        <div className="flex items-center justify-center gap-2">
          {isComputerThinking ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            />
          ) : currentPlayer && (
            currentPlayer === "X" ? (
              <X className="text-game-x-color" size={18} />
            ) : (
              <Circle className="text-game-o-color" size={18} />
            )
          )}
          <span className="font-medium">{statusMessage}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GameStatus;
