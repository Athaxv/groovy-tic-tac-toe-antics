
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GameCellProps = {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinningCell: boolean;
  isDisabled: boolean;
};

const GameCell: React.FC<GameCellProps> = ({ 
  value, 
  onClick, 
  isWinningCell,
  isDisabled
}) => {
  const cellRef = useRef<HTMLDivElement>(null);

  // Add confetti effect for winning cells
  useEffect(() => {
    if (isWinningCell && cellRef.current) {
      createConfetti(cellRef.current);
    }
  }, [isWinningCell]);

  const createConfetti = (element: HTMLElement) => {
    const colors = ["#9b87f5", "#7E69AB", "#F97316", "#0EA5E9", "#D946EF"];
    
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      element.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
  };

  return (
    <motion.div
      ref={cellRef}
      className={cn(
        "cell",
        isWinningCell && "winning",
        isDisabled && "opacity-80"
      )}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      onClick={onClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {value === "X" && (
        <svg className="x-mark w-2/3 h-2/3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      
      {value === "O" && (
        <svg className="o-mark w-2/3 h-2/3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="8" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </motion.div>
  );
};

export default GameCell;
