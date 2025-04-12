
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Users, Cpu, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

type GameControlsProps = {
  gameMode: "player" | "computer";
  onChangeGameMode: (mode: "player" | "computer") => void;
  onResetGame: () => void;
  isGameActive: boolean;
};

const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  onChangeGameMode,
  onResetGame,
  isGameActive
}) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-xl p-4 shadow-md mb-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full sm:w-auto">
        <ToggleGroup type="single" value={gameMode} onValueChange={(value) => {
          if (value) onChangeGameMode(value as "player" | "computer");
        }}>
          <ToggleGroupItem value="player" aria-label="Play with friend">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">2 Players</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="computer" aria-label="Play with computer">
            <Cpu className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Computer</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <Button 
        onClick={onResetGame} 
        variant="outline" 
        size="sm"
        className={!isGameActive ? "opacity-50" : ""}
        disabled={!isGameActive}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        New Game
      </Button>
    </motion.div>
  );
};

export default GameControls;
